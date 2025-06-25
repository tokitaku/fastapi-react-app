# Backend

## Running the FastAPI server

### Using Poetry

```bash
cd backend
poetry install
poetry run uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

### Using Docker Compose

Ensure Docker and Docker Compose are installed, then from the project root run:

```bash
# Build and start the container
docker compose up --build

# Or run in detached mode (background)
docker compose up -d --build

# Stop the container
docker compose down
```

The API will be available at `http://localhost:8001`.

#### Docker Setup Details

- **Port**: The application runs on port 8001 (mapped from container port 8000)
- **Auto-reload**: File changes are automatically detected and the server reloads
- **API Documentation**: Available at `http://localhost:8001/docs`
- **Volume Mounting**: Local backend directory is mounted for development

#### Troubleshooting

If you encounter port conflicts:
1. Check which process is using the port: `lsof -i :8001`
2. Stop conflicting containers: `docker compose down`
3. Or modify the port in `docker-compose.yml` if needed

## Docker & Poetry のベストプラクティス

### 現在の実装（改善済み）
PRフィードバックを反映した改善版Dockerfile：

```dockerfile
# バージョン固定でPoetryをインストール
RUN pip install --no-cache-dir "poetry==1.8.1"

# 依存関係ファイルをコピー（レイヤーキャッシュ最適化）
COPY backend/pyproject.toml backend/poetry.lock /app/

# Poetry設定と依存関係インストール（1つのレイヤーにまとめる）
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-root --no-ansi
```

### 推奨される方法

#### 1. **開発環境**: Poetry使用（現在の方法）
- **利点**: 
  - ホットリロード対応
  - 開発依存関係も含む
  - poetry.lockによる正確な依存関係管理
- **欠点**: 
  - イメージサイズが大きい
  - Poetryが実行時にも残る

#### 2. **本番環境**: requirements.txt方式
- **利点**:
  - 軽量なイメージ
  - Poetryの依存関係不要
  - セキュリティ向上
- **実装例**:
```dockerfile
# Poetry で requirements.txt を生成
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes
RUN pip install --no-cache-dir -r requirements.txt
RUN pip uninstall -y poetry  # Poetry を削除
```

#### 3. **マルチステージビルド**（推奨）
- **利点**:
  - 最小限のイメージサイズ
  - セキュリティ向上
  - ビルド時間の最適化

### 使い分けの指針

| 環境         | 推奨方法             | 理由                         |
| ------------ | -------------------- | ---------------------------- |
| 開発         | Poetry使用           | ホットリロード、デバッグ容易 |
| ステージング | requirements.txt     | 本番環境に近い構成           |
| 本番         | マルチステージビルド | 最適化、セキュリティ         |

### PRでよくあるコメント

1. **"Poetry のバージョン固定"** ⭐ **重要**
   ```dockerfile
   # ❌ 非推奨: バージョン未指定
   RUN pip install --no-cache-dir poetry
   
   # ✅ 推奨: バージョン固定
   RUN pip install --no-cache-dir "poetry==1.8.1"
   ```
   → Poetry の CLI API 変更による Breaking Changes を防ぐ

2. **"レイヤーキャッシュの最適化"**
   ```dockerfile
   # ❌ 非効率: 分離されたコマンド
   RUN pip install --no-cache-dir poetry
   RUN poetry config virtualenvs.create false \
       && poetry install --no-interaction
   
   # ✅ 最適化: 関連コマンドをグループ化
   RUN poetry config virtualenvs.create false \
       && poetry install --no-interaction --no-ansi
   ```
   → Docker レイヤーキャッシュの効率化

3. **"--no-ansi オプションの追加"**
   ```dockerfile
   RUN poetry install --no-interaction --no-root --no-ansi
   ```
   → CI/CD環境でのログ出力を見やすくする

4. **"--no-root オプションの必要性"**
   → プロジェクト自体のインストールを避けるため（依存関係のみインストール）

5. **"マルチステージビルドの検討"**
   → 本番デプロイ時のイメージサイズとセキュリティ向上のため
