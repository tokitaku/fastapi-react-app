# tests/test_crud.py
from sqlmodel import Session

from backend.database import engine, create_db_and_tables
from backend.crud import create_hero, get_hero
from backend.schemas import HeroCreate


def setup_module():
    create_db_and_tables()


def test_create_and_get_hero():
    with Session(engine) as session:
        hero = create_hero(session, HeroCreate(name="Test", secret_name="隠し"))
        assert hero.id is not None
        fetched = get_hero(session, hero.id)
        assert fetched is not None, "英雄が見つかりませんでした"
        assert fetched.name == "Test"
