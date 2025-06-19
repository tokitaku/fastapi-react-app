# FastAPI Backend

This directory contains the FastAPI backend for the demo sales management application.

## Development

Install dependencies and run the development server:

```bash
poetry install
poetry run uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Run tests with:

```bash
poetry run pytest
```
