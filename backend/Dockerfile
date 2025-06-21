FROM python:3.10-slim

WORKDIR /app

RUN pip install --no-cache-dir poetry

COPY backend/pyproject.toml backend/poetry.lock /app/
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction

COPY backend /app

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
