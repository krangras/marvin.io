import http.server
import logging
import sys
import os
import signal
import mimetypes
import gzip
import io

logging.basicConfig(
    stream=sys.stdout,
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

EXTRA_MIME = {
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
}
for ext, mime in EXTRA_MIME.items():
    mimetypes.add_type(mime, ext, strict=True)

GZIP_TYPES = {
    'application/javascript',
    'text/css',
    'text/html',
    'application/json',
    'image/svg+xml',
}

GZIP_MIN = 512


def get_cache_control(path):
    if path == '/sw.js':
        return 'no-cache, no-store, must-revalidate'
    if path.startswith('/image/'):
        return 'public, max-age=604800'
    if any(path.endswith(e) for e in ('.js', '.css', '.svg', '.png', '.jpg', '.ico', '.woff', '.woff2')):
        return 'public, max-age=3600'
    return 'no-cache'


class LoggingHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        logging.info("%s - %s", self.client_address[0], format % args)

    def end_headers(self):
        self.send_header('Connection', 'keep-alive')
        self.send_header('Cache-Control', get_cache_control(self.path))
        super().end_headers()

    def do_GET(self):
        try:
            path = self.translate_path(self.path)
            if (os.path.exists(path)
                    and not os.path.isdir(path)
                    and self.headers.get('Accept-Encoding', '').find('gzip') != -1):
                mime = mimetypes.guess_type(path)[0] or 'application/octet-stream'
                if mime in GZIP_TYPES:
                    with open(path, 'rb') as f:
                        data = f.read()
                    if len(data) >= GZIP_MIN:
                        buf = io.BytesIO()
                        with gzip.GzipFile(fileobj=buf, mode='wb') as gz:
                            gz.write(data)
                        compressed = buf.getvalue()
                        fobj = io.BytesIO(compressed)
                        self.send_response(200)
                        self.send_header('Content-Type', mime)
                        self.send_header('Content-Length', str(len(compressed)))
                        self.send_header('Content-Encoding', 'gzip')
                        self.send_header('Vary', 'Accept-Encoding')
                        self.end_headers()
                        try:
                            self.copyfile(fobj, self.wfile)
                        finally:
                            fobj.close()
                        return
            super().do_GET()
        except BrokenPipeError:
            pass
        except ConnectionResetError:
            pass
        except Exception as e:
            logging.error("Error handling %s: %s", self.path, e)

    def do_HEAD(self):
        try:
            super().do_HEAD()
        except BrokenPipeError:
            pass
        except ConnectionResetError:
            pass
        except Exception as e:
            logging.error("Error handling %s: %s", self.path, e)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    bind = os.environ.get("BIND", "0.0.0.0")
    directory = os.environ.get("DIR", ".")

    os.chdir(directory)

    server = http.server.ThreadingHTTPServer((bind, port), LoggingHandler)
    server.allow_reuse_address = True

    def shutdown(sig, frame):
        logging.info("Shutting down...")
        server.shutdown()
        sys.exit(0)

    signal.signal(signal.SIGTERM, shutdown)
    signal.signal(signal.SIGINT, shutdown)

    logging.info("Starting server on %s:%s, serving %s", bind, port, directory)
    sys.stdout.flush()
    server.serve_forever()
