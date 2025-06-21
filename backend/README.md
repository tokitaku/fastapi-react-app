# Backend

## Running the FastAPI server

### Using Poetry

```bash
cd backend
poetry install
poetry run uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

### Using Docker Compose

Ensure Docker is installed, then from the project root run:

```bash
docker compose up --build
```

The API will be available at `http://localhost:8000`.
