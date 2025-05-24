from sqlmodel import Session, select

from . import models
from . import schemas


def get_users(session: Session):
    return session.exec(select(models.User)).all()


def get_user(session: Session, user_id: int):
    return session.get(models.User, user_id)


def get_user_by_name(session: Session, name: str):
    statement = select(models.User).where(models.User.name == name)
    return session.exec(statement).first()


def get_user_by_name_and_password(session: Session, name: str, password: str):
    statement = select(models.User).where(
        models.User.name == name, models.User.password == password
    )
    return session.exec(statement).first()


def create_user(session: Session, user: schemas.UserCreate):
    db_user = models.User(
        name=user.name,
        password=user.password,
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user
