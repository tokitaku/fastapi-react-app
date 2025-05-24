from typing import List, Sequence

from sqlmodel import Session, select

from backend.models import Hero
from backend.schemas import HeroCreate


def create_hero(session: Session, hero_in: HeroCreate) -> Hero:
    hero = Hero(**hero_in.model_dump())
    session.add(hero)
    session.commit()
    session.refresh(hero)
    return hero


def get_hero(session: Session, hero_id: int) -> Hero | None:
    return session.get(Hero, hero_id)


def get_heroes(session: Session, *, offset: int = 0, limit: int = 100):
    statement = select(Hero).offset(offset).limit(limit)
    return session.exec(statement).all()


def delete_hero(session: Session, hero_id: int) -> bool:
    hero = get_hero(session, hero_id)
    if not hero:
        return False  # 早期リターン
    session.delete(hero)
    session.commit()
    return True
