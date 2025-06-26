# セキュリティを考慮した開発用Docker設定
FROM python:3.12-slim

# 必要なパッケージのインストール
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Poetryのインストール
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir "poetry==1.8.3"

# 依存関係ファイルをコピーしてインストール
COPY pyproject.toml poetry.lock /app/
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-root --no-ansi

# アプリケーションコードをコピー
COPY . /app

# backendディレクトリへのシンボリックリンクを作成
RUN ln -s /app /backend

# Pythonパスを設定してbackendディレクトリをパッケージとして認識させる
ENV PYTHONPATH=/app:/
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
