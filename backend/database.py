# filepath: /Users/tokimasatakuya/Dev/python_projects/fastapi_react_app/backend/database.py
from sqlmodel import SQLModel, create_engine

sqlite_url = "sqlite:///database.db"
engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
