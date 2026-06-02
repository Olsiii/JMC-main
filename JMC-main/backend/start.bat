@echo off
cd /d "%~dp0"
if not exist venv (
    echo Creating virtual environment...
    py -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate.bat
)
echo Starting backend server on http://localhost:8000
uvicorn server:app --host 0.0.0.0 --port 8000
