#!/usr/bin/env python3
"""
PDF Parser for marv.in
Parses scanned PDFs → HTML conspects + JSON tasks.

Usage:
    python parse_pdf.py <input.pdf> [options]

Examples:
    python parse_pdf.py lecture.pdf
    python parse_pdf.py lecture.pdf --mode conspects --output ./output
    python parse_pdf.py exam.pdf --mode tasks --title "Контрольная 3"
    python parse_pdf.py lecture.pdf --dpi 300 --ocr rus
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("ERROR: PyMuPDF not installed. Run: pip install PyMuPDF")
    sys.exit(1)

try:
    from PIL import Image, ImageFilter, ImageDraw
    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print("WARNING: Pillow not installed. Image processing limited.")

try:
    import pytesseract
    HAS_OCR = True
except ImportError:
    HAS_OCR = False


# ══════════════════════════════════════════════════════════════
# CONFIG
# ══════════════════════════════════════════════════════════════

DEFAULT_DPI = 200
MIN_FORMULA_HEIGHT = 30
MIN_FORMULA_WIDTH = 60
FORMULA_DENSITY_THRESHOLD = 0.15
TEXT_BLOCK_MIN_HEIGHT = 20


# ══════════════════════════════════════════════════════════════
# PAGE EXTRACTION
# ══════════════════════════════════════════════════════════════

def extract_pages(pdf_path, dpi=DEFAULT_DPI):
    """Extract each page as a PIL Image."""
    doc = fitz.open(pdf_path)
    pages = []
    zoom = dpi / 72
    mat = fitz.Matrix(zoom, zoom)

    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=mat)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        pages.append({
            "index": i,
            "width": pix.width,
            "height": pix.height,
            "image": img,
        })
        print(f"  Page {i+1}/{len(doc)}: {pix.width}x{pix.height}px")

    doc.close()
    return pages


# ══════════════════════════════════════════════════════════════
# OCR
# ══════════════════════════════════════════════════════════════

def ocr_page(image, lang="rus+eng"):
    """Run OCR on a page image, return text."""
    if not HAS_OCR:
        return ""
    try:
        text = pytesseract.image_to_string(image, lang=lang)
        return text.strip()
    except Exception as e:
        print(f"  OCR error: {e}")
        return ""


def ocr_region(image, bbox, lang="rus+eng"):
    """OCR a specific region (x, y, w, h)."""
    if not HAS_OCR:
        return ""
    try:
        x, y, w, h = bbox
        region = image.crop((x, y, x + w, y + h))
        text = pytesseract.image_to_string(region, lang=lang)
        return text.strip()
    except Exception:
        return ""


# ══════════════════════════════════════════════════════════════
# FORMULA DETECTION
# ══════════════════════════════════════════════════════════════

def detect_formula_regions(image):
    """
    Detect regions likely containing math formulas.
    Strategy: find dense, isolated rectangular regions on the page.
    Returns list of (x, y, w, h) bounding boxes.
    """
    if not HAS_PIL:
        return []

    gray = image.convert("L")
    # Threshold: pixels darker than 180 become black (content)
    threshold = 180
    binary = gray.point(lambda p: 255 if p > threshold else 0)

    # Find bounding boxes of content regions
    # Use a simple projection-based approach
    width, height = binary.size
    pixels = list(binary.getdata())

    # Horizontal projection (row sums)
    h_proj = []
    for row in range(height):
        count = 0
        for col in range(width):
            if pixels[row * width + col] == 0:
                count += 1
        h_proj.append(count)

    # Find horizontal bands with content
    bands = []
    in_band = False
    band_start = 0
    for i, count in enumerate(h_proj):
        if count > 2 and not in_band:
            in_band = True
            band_start = i
        elif count <= 2 and in_band:
            in_band = False
            if i - band_start > MIN_FORMULA_HEIGHT:
                bands.append((band_start, i))
    if in_band:
        bands.append((band_start, height))

    # For each band, find vertical extent and check density
    formula_regions = []
    for y_start, y_end in bands:
        band_height = y_end - y_start
        # Vertical projection for this band
        v_proj = []
        for col in range(width):
            count = 0
            for row in range(y_start, y_end):
                if pixels[row * width + col] == 0:
                    count += 1
            v_proj.append(count)

        # Find contiguous horizontal ranges
        in_range = False
        range_start = 0
        for j, count in enumerate(v_proj):
            if count > 0 and not in_range:
                in_range = True
                range_start = j
            elif count <= 0 and in_range:
                in_range = False
                range_width = j - range_start
                if range_width > MIN_FORMULA_WIDTH:
                    # Calculate density
                    total_pixels = range_width * band_height
                    content_pixels = sum(
                        1 for row in range(y_start, y_end)
                        for col in range(range_start, j)
                        if pixels[row * width + col] == 0
                    )
                    density = content_pixels / total_pixels if total_pixels > 0 else 0

                    if density > FORMULA_DENSITY_THRESHOLD:
                        formula_regions.append((
                            range_start, y_start,
                            range_width, band_height
                        ))
        if in_range:
            range_width = width - range_start
            if range_width > MIN_FORMULA_WIDTH:
                formula_regions.append((
                    range_start, y_start,
                    range_width, band_height
                ))

    return _merge_nearby_regions(formula_regions)


def _merge_nearby_regions(regions, gap=15):
    """Merge regions that are close to each other."""
    if not regions:
        return []

    # Sort by y then x
    regions = sorted(regions, key=lambda r: (r[1], r[0]))
    merged = [regions[0]]

    for r in regions[1:]:
        last = merged[-1]
        # Check if vertically overlapping or close
        if (r[1] <= last[1] + last[3] + gap and
            abs(r[0] - last[0]) < gap * 3):
            # Merge
            new_x = min(last[0], r[0])
            new_y = min(last[1], r[1])
            new_w = max(last[0] + last[2], r[0] + r[2]) - new_x
            new_h = max(last[1] + last[3], r[1] + r[3]) - new_y
            merged[-1] = (new_x, new_y, new_w, new_h)
        else:
            merged.append(r)

    return merged


def extract_formula_images(page_image, regions, output_dir, page_num):
    """Save detected formula regions as individual images."""
    saved = []
    for i, (x, y, w, h) in enumerate(regions):
        # Add padding
        pad = 10
        crop_box = (
            max(0, x - pad),
            max(0, y - pad),
            min(page_image.width, x + w + pad),
            min(page_image.height, y + h + pad),
        )
        formula_img = page_image.crop(crop_box)
        filename = f"page{page_num + 1}_formula_{i + 1}.png"
        filepath = os.path.join(output_dir, filename)
        formula_img.save(filepath)
        saved.append({"file": filename, "bbox": (x, y, w, h)})
    return saved


# ══════════════════════════════════════════════════════════════
# PAGE ANALYSIS
# ══════════════════════════════════════════════════════════════

def analyze_page(page_image, page_num, ocr_lang, output_dir):
    """Full analysis of one page: OCR + formula detection + layout."""
    result = {
        "page": page_num + 1,
        "image": f"page{page_num + 1}.png",
        "text": "",
        "formulas": [],
        "regions": [],
    }

    # Save full page image
    page_path = os.path.join(output_dir, result["image"])
    page_image.save(page_path)

    # OCR
    if ocr_lang:
        text = ocr_page(page_image, lang=ocr_lang)
        result["text"] = text

    # Formula detection
    regions = detect_formula_regions(page_image)
    if regions:
        formulas = extract_formula_images(
            page_image, regions, output_dir, page_num
        )
        result["formulas"] = formulas
        result["regions"] = regions

    return result


# ══════════════════════════════════════════════════════════════
# TEXT PROCESSING
# ══════════════════════════════════════════════════════════════

def detect_headings(text):
    """Detect potential headings in OCR text."""
    lines = text.split("\n")
    headings = []
    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped:
            continue
        # Heuristics for headings
        is_heading = False
        # All caps or mostly caps
        if len(stripped) > 3 and stripped == stripped.upper() and not stripped.isdigit():
            is_heading = True
        # Starts with number and dot (e.g., "1.1" or "1.")
        if re.match(r'^\d+(\.\d+)*\.?\s+[А-ЯA-Z]', stripped):
            is_heading = True
        # Common heading patterns
        if re.match(r'^(Глава|Раздел|Тема|Вопрос|Билет|Параграф)\s', stripped, re.I):
            is_heading = True
        if is_heading:
            headings.append({"line": i, "text": stripped})
    return headings


def detect_task_blocks(text):
    """Detect numbered task/question blocks in OCR text."""
    blocks = []
    lines = text.split("\n")
    current_block = None

    task_pattern = re.compile(
        r'^(\d{1,3})[\.\)]\s*(.+)', re.MULTILINE
    )
    answer_pattern = re.compile(
        r'^(а|б|в|г|д|a|b|c|d|e)\)[\s:]+(.+)', re.I
    )

    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue

        task_match = task_pattern.match(stripped)
        if task_match:
            if current_block:
                blocks.append(current_block)
            current_block = {
                "num": int(task_match.group(1)),
                "text": task_match.group(2),
                "options": [],
                "answer": None,
            }
            continue

        if current_block:
            answer_match = answer_pattern.match(stripped)
            if answer_match:
                current_block["options"].append(answer_match.group(2))
            elif stripped.lower().startswith("ответ"):
                current_block["answer"] = stripped.split(":", 1)[-1].strip()

    if current_block:
        blocks.append(current_block)

    return blocks


def split_into_sections(text, headings):
    """Split text into sections based on detected headings."""
    if not headings:
        return [{"title": "Содержание", "text": text}]

    sections = []
    lines = text.split("\n")

    for i, h in enumerate(headings):
        start = h["line"]
        end = headings[i + 1]["line"] if i + 1 < len(headings) else len(lines)
        section_text = "\n".join(lines[start:end]).strip()
        if section_text:
            sections.append({
                "title": h["text"],
                "text": section_text,
            })

    return sections


# ══════════════════════════════════════════════════════════════
# OUTPUT GENERATORS
# ══════════════════════════════════════════════════════════════

def generate_conspect_html(page_data, images_dir):
    """Generate HTML conspect from analyzed page data."""
    html_parts = []

    for page in page_data:
        # Page image as figure
        html_parts.append(
            f'<div class="conspect-page" style="margin: 1rem 0; text-align: center;">'
            f'<img src="{images_dir}/{page["image"]}" '
            f'alt="Страница {page["page"]}" '
            f'style="max-width: 100%; border: 1px solid var(--ring); border-radius: 8px;">'
            f'</div>'
        )

        # Formula images
        for formula in page.get("formulas", []):
            html_parts.append(
                f'<div class="conspect-formula" style="text-align: center; margin: 0.5rem 0;">'
                f'<img src="{images_dir}/{formula["file"]}" '
                f'alt="Формула" '
                f'style="max-width: 80%; height: auto;">'
                f'</div>'
            )

        # OCR text (if available)
        if page.get("text"):
            html_parts.append(
                f'<div class="conspect-text" style="padding: 0.5rem;">'
                f'<pre style="white-space: pre-wrap; font-family: var(--font-print); '
                f'font-size: 0.8rem; line-height: 1.6;">'
                f'{_escape_html(page["text"])}</pre></div>'
            )

    return "\n".join(html_parts)


def generate_conspect_object(page_data, title, images_dir):
    """Generate a JS object for conspects.js format."""
    html = generate_conspect_html(page_data, images_dir)
    return {
        "title": title,
        "html": html,
    }


def generate_tasks_json(page_data, title):
    """Generate JSON tasks from detected task blocks."""
    all_tasks = []
    for page in page_data:
        text = page.get("text", "")
        if not text:
            continue
        blocks = detect_task_blocks(text)
        for block in blocks:
            task = {
                "num": block["num"],
                "text": block["text"],
                "page": page["page"],
            }
            if block["options"]:
                task["options"] = block["options"]
                task["correctIndex"] = 0
            if block["answer"]:
                task["answer"] = block["answer"]
                task["answerType"] = "text"
            all_tasks.append(task)

    return {
        "title": title,
        "tasks": all_tasks,
        "totalTasks": len(all_tasks),
    }


def generate_physics_data(page_data, section_id, title, images_dir):
    """Generate physics_ntk_data.js compatible format."""
    problems = []
    for page in page_data:
        text = page.get("text", "")
        if not text:
            continue
        blocks = detect_task_blocks(text)
        for block in blocks:
            problem = {
                "num": block["num"],
                "text": block["text"],
            }
            # Use page image as problem image
            problem["image"] = f"{images_dir}/{page['image']}"

            if block["options"]:
                problem["options"] = block["options"]
                if block["answer"]:
                    # Try to find correct index
                    for idx, opt in enumerate(block["options"]):
                        if block["answer"].lower() in opt.lower():
                            problem["correctIndex"] = idx
                            break
                    else:
                        problem["correctIndex"] = 0
                else:
                    problem["correctIndex"] = 0
            elif block["answer"]:
                problem["answer"] = block["answer"]
                problem["answerType"] = "text"

            problems.append(problem)

    return {
        "id": section_id,
        "title": title,
        "problems": problems,
    }


def generate_integrals_data(page_data, images_dir):
    """Generate integrals_data.js compatible format."""
    sections = []
    for page in page_data:
        text = page.get("text", "")
        if not text:
            continue
        headings = detect_headings(text)
        page_sections = split_into_sections(text, headings)
        for sec in page_sections:
            sections.append({
                "name": sec["title"],
                "content": sec["text"],
                "image": f"{images_dir}/{page['image']}",
            })
    return sections


def _escape_html(text):
    """Escape HTML special characters."""
    return (text
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


# ══════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description="Parse scanned PDF → HTML conspects + JSON tasks",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s lecture.pdf
  %(prog)s exam.pdf --mode tasks --title "Экзамен"
  %(prog)s physics.pdf --mode physics --section-id kinematika --title "Кинематика"
  %(prog)s math.pdf --mode integrals
  %(prog)s lecture.pdf --dpi 300 --ocr rus+eng --pages 1-5
        """
    )
    parser.add_argument("input", help="Input PDF file")
    parser.add_argument("-o", "--output", default="./output",
                        help="Output directory (default: ./output)")
    parser.add_argument("-m", "--mode", choices=["conspects", "tasks", "physics", "integrals", "all"],
                        default="all",
                        help="Output mode (default: all)")
    parser.add_argument("--title", default=None,
                        help="Title for the content")
    parser.add_argument("--section-id", default="custom",
                        help="Section ID for physics mode")
    parser.add_argument("--dpi", type=int, default=DEFAULT_DPI,
                        help=f"Image DPI (default: {DEFAULT_DPI})")
    parser.add_argument("--ocr", default=None, const="rus+eng", nargs="?",
                        help="OCR language (default: rus+eng, no arg = no OCR)")
    parser.add_argument("--pages", default=None,
                        help="Page range, e.g. 1-5 or 1,3,5-8")
    parser.add_argument("--no-formulas", action="store_true",
                        help="Skip formula detection")

    args = parser.parse_args()

    if not os.path.exists(args.input):
        print(f"ERROR: File not found: {args.input}")
        sys.exit(1)

    # Parse page range
    page_range = None
    if args.pages:
        page_range = _parse_page_range(args.pages)

    # OCR language
    ocr_lang = args.ocr if HAS_OCR else None
    if args.ocr and not HAS_OCR:
        print("WARNING: pytesseract not installed. OCR disabled.")
        print("  Install: pip install pytesseract")
        print("  Also need Tesseract-OCR: https://github.com/tesseract-ocr/tesseract")

    title = args.title or Path(args.input).stem

    print(f"\n{'='*50}")
    print(f"PDF Parser — marv.in")
    print(f"{'='*50}")
    print(f"Input:    {args.input}")
    print(f"Output:   {args.output}")
    print(f"Mode:     {args.mode}")
    print(f"DPI:      {args.dpi}")
    print(f"OCR:      {ocr_lang or 'disabled'}")
    print(f"Formulas: {'no' if args.no_formulas else 'yes'}")
    if page_range:
        print(f"Pages:    {page_range}")
    print()

    # Create output directories
    images_dir = os.path.join(args.output, "images")
    os.makedirs(images_dir, exist_ok=True)

    # Extract pages
    print("Extracting pages...")
    all_pages = extract_pages(args.input, dpi=args.dpi)

    if page_range:
        all_pages = [p for p in all_pages if p["index"] in page_range]

    print(f"\nAnalyzing {len(all_pages)} pages...\n")

    # Analyze each page
    analyzed = []
    for page in all_pages:
        print(f"  Analyzing page {page['index']+1}...", end=" ")
        result = analyze_page(
            page["image"], page["index"],
            ocr_lang, images_dir
        )

        if not args.no_formulas and HAS_PIL:
            regions = detect_formula_regions(page["image"])
            if regions:
                formulas = extract_formula_images(
                    page["image"], regions, images_dir, page["index"]
                )
                result["formulas"] = formulas
                print(f"OCR: {len(result['text'])} chars, "
                      f"Formulas: {len(formulas)}", end="")
            else:
                print(f"OCR: {len(result['text'])} chars, Formulas: 0", end="")
        else:
            print(f"OCR: {len(result['text'])} chars", end="")

        analyzed.append(result)
        print(" ✓")

    # Generate outputs
    print(f"\nGenerating output...")

    if args.mode in ("conspects", "all"):
        _write_conspects(analyzed, title, images_dir, args.output)

    if args.mode in ("tasks", "all"):
        _write_tasks(analyzed, title, args.output)

    if args.mode in ("physics", "all"):
        _write_physics(analyzed, args.section_id, title, images_dir, args.output)

    if args.mode in ("integrals", "all"):
        _write_integrals(analyzed, title, images_dir, args.output)

    # Write raw data
    raw_path = os.path.join(args.output, "raw_data.json")
    with open(raw_path, "w", encoding="utf-8") as f:
        json.dump(analyzed, f, ensure_ascii=False, indent=2, default=str)
    print(f"  Raw data: {raw_path}")

    print(f"\n{'='*50}")
    print(f"Done! Output in: {args.output}")
    print(f"{'='*50}\n")
    print("Next steps:")
    print("  1. Review extracted images in output/images/")
    print("  2. Edit generated JS/JSON files if needed")
    print("  3. Copy content into src/data/ files")


def _parse_page_range(spec):
    """Parse page range like '1-5' or '1,3,5-8'."""
    pages = set()
    for part in spec.split(","):
        part = part.strip()
        if "-" in part:
            start, end = part.split("-", 1)
            pages.update(range(int(start) - 1, int(end)))
        else:
            pages.add(int(part) - 1)
    return sorted(pages)


def _write_conspects(analyzed, title, images_dir, output_dir):
    """Write conspect output files."""
    html = generate_conspect_html(analyzed, "images")

    # Standalone HTML file for preview
    full_html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>{_escape_html(title)}</title>
    <style>
        body {{ font-family: sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1rem; }}
        img {{ max-width: 100%; height: auto; margin: 0.5rem 0; border: 1px solid #ddd; border-radius: 8px; }}
        pre {{ background: #f5f5f5; padding: 1rem; border-radius: 8px; white-space: pre-wrap; }}
    </style>
</head>
<body>
    <h1>{_escape_html(title)}</h1>
    {html}
</body>
</html>"""

    html_path = os.path.join(output_dir, "conspect_preview.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(full_html)
    print(f"  Conspect HTML: {html_path}")

    # JS format for conspects.js
    js_obj = generate_conspect_object(analyzed, title, "assets/img")
    js_path = os.path.join(output_dir, "conspect_data.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(f"// {title}\n")
        f.write(f"// Copy this into conspects.js:\n")
        f.write(f"// CONSPECTS[INDEX] = `\n{js_obj['html']}`;\n\n")
        f.write(f"const CONSPLECT_DATA = {json.dumps(js_obj, ensure_ascii=False, indent=2)};\n")
    print(f"  Conspect JS:   {js_path}")


def _write_tasks(analyzed, title, output_dir):
    """Write task output files."""
    tasks = generate_tasks_json(analyzed, title)

    json_path = os.path.join(output_dir, "tasks.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(tasks, f, ensure_ascii=False, indent=2)
    print(f"  Tasks JSON:    {json_path}")

    js_path = os.path.join(output_dir, "tasks_data.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(f"// {title}\n")
        f.write(f"// Copy this into physics_ntk_data.js or similar:\n")
        f.write(f"const TASKS_DATA = {json.dumps(tasks, ensure_ascii=False, indent=2)};\n")
    print(f"  Tasks JS:      {js_path}")


def _write_physics(analyzed, section_id, title, images_dir, output_dir):
    """Write physics NTK compatible data."""
    data = generate_physics_data(analyzed, section_id, title, "assets/img")

    js_path = os.path.join(output_dir, "physics_section.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(f"// Physics section: {title}\n")
        f.write(f"// Add this to PHYSICS_NTK_DATA array in physics_ntk_data.js:\n\n")
        f.write(f"const PHYSICS_SECTION = {json.dumps(data, ensure_ascii=False, indent=2)};\n")
        f.write(f"\n// To add: PHYSICS_NTK_DATA.push(PHYSICS_SECTION);\n")
    print(f"  Physics JS:    {js_path}")


def _write_integrals(analyzed, title, images_dir, output_dir):
    """Write integrals compatible data."""
    data = generate_integrals_data(analyzed, "assets/img")

    js_path = os.path.join(output_dir, "integrals_section.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(f"// Integrals section: {title}\n")
        f.write(f"// Format compatible with integrals_data.js\n\n")
        f.write(f"const INTEGRALS_SECTION = {json.dumps(data, ensure_ascii=False, indent=2)};\n")
    print(f"  Integrals JS:  {js_path}")


if __name__ == "__main__":
    main()
