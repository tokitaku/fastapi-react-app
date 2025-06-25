FROM python:3.10-slim

WORKDIR /app

RUN pip install --no-cache-dir "poetry==1.8.1"

COPY pyproject.toml poetry.lock /app/
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-root --no-ansi

COPY . /app
