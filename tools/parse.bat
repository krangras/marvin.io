@echo off
REM Quick-run script for PDF parser
REM Usage: parse.bat <file.pdf> [mode]

if "%~1"=="" (
    echo Usage: parse.bat ^<file.pdf^> [conspects^|tasks^|physics^|integrals^|all]
    echo.
    echo Examples:
    echo   parse.bat lecture.pdf
    echo   parse.bat exam.pdf tasks
    echo   parse.bat physics.pdf physics --section-id kinematika
    exit /b 1
)

python "%~dp0parse_pdf.py" %*
