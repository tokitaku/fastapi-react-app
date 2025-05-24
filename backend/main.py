from contextlib import asynccontextmanager

from fastapi import FastAPI

from backend.database import create_db_and_tables
from backend.routes import heroes


@asynccontextmanager
async def lifespan(app: FastAPI):
    # スタートアップ処理
    create_db_and_tables()
    yield
    # シャットダウン処理はここに記述


app = FastAPI(
    title="Hero API",
    description="Hero APIのサンプルアプリケーション",
    lifespan=lifespan,
)


# ルーターを登録
app.include_router(heroes.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Hero API"}
