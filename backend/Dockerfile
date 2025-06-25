# セキュリティを考慮した開発用Docker設定
FROM python:3.12-slim

# システムの更新とセキュリティパッチの適用
RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Poetryのインストール
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir "poetry==1.8.3"

# 依存関係ファイルをコピーしてインストール
COPY pyproject.toml poetry.lock /app/backend/
RUN cd /app/backend && poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-root --no-ansi

# アプリケーションコードをコピー
COPY . /app/backend

# Pythonパスを設定
ENV PYTHONPATH=/app

# 作業ディレクトリをbackendに設定
WORKDIR /app/backend
