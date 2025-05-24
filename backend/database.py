from sqlmodel import SQLModel, Session, create_engine

# SQLite 用の URL とエンジンを作成
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"
connect_args = {"check_same_thread": False}

engine = create_engine(
    url=sqlite_url,
    connect_args=connect_args,
)


# テーブルを作成する関数
def create_db_and_tables() -> None:
    """
    アプリ起動時に呼び出してテーブルを作成します。
    既に存在する場合は何もしません。
    """
    SQLModel.metadata.create_all(engine)


# — 3. セッションを取得する依存関数
def get_session():
    """
    FastAPI の Depends で使うセッション取得関数。
    with ブロックで自動コミット／クローズされます。
    """
    with Session(engine) as session:
        yield session
