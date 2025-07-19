# Backend

This directory contains the FastAPI server for the sales management sample application. The API uses **SQLModel** with a local SQLite database and exposes endpoints for users, sales records and simple word registration.

## Requirements
- Python 3.11
- [Poetry](https://python-poetry.org/) for dependency management
- (Optional) Docker/Docker Compose for containerised development

## Setup and Development

### Using Poetry
```bash
cd backend
poetry install --no-root      # install dependencies
poetry run fastapi dev main.py --host 127.0.0.1 --port 8000
```
The server will start locally on <http://127.0.0.1:8000>. API docs are available at `/docs`.

### Using Docker Compose
Run from the project root:
```bash
# Build and run the backend container
docker compose up --build
# Or run in detached mode
docker compose up -d --build
# Stop containers
docker compose down
```
The backend is mapped to <http://localhost:8001> by default.

## Running Tests
```bash
cd backend
poetry install --no-root
poetry run pytest
```

## Project Structure
- `main.py` – FastAPI application with all routes
- `models.py` – SQLModel table definitions
- `schemas.py` – Pydantic schemas for request/response validation
- `crud.py` – Database access functions
- `database.py` – SQLite configuration and session dependency
- `tests/` – Pytest test suite

## Database
A SQLite file `sales_info.db` is created at the project root when the server starts. Tables are automatically created on startup.

## Available Endpoints
- `POST /users/` – create a user
- `GET /users/` – list users
- `GET /user` – retrieve a single user by name and password
- `POST /sales/` – register sales data
- `GET /sales/` – list or filter sales data
- `GET /sales/{year}` – fetch sales for a year
- `POST /words/` – register an English word
- `GET /words/` – list words
- `GET /words/{word_text}` – fetch a word by text

