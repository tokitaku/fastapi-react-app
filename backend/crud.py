from sqlmodel import Session, select

from . import models
from . import schemas


def get_users(session: Session, skip: int = 0, limit: int = 100):
    statement = select(models.User).offset(skip).limit(limit)
    return session.exec(statement).all()


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


def get_sales(session: Session, skip: int = 0, limit: int = 100):
    statement = select(models.Sales).offset(skip).limit(limit)
    return session.exec(statement).all()


def get_sales_by_year(session: Session, year: int):
    statement = select(models.Sales).where(models.Sales.year == year)
    return session.exec(statement).all()


def get_sales_by_year_by_department(
    session: Session, year: int, department: str, sales: float = 0
):
    statement = select(models.Sales).where(
        models.Sales.year == year,
        models.Sales.department == department,
        models.Sales.sales == sales,
    )
    return session.exec(statement).all()


def create_sales(session: Session, sales: schemas.SalesCreate):
    existing_sales = get_sales_by_year_by_department(
        session, sales.year, sales.department, sales.sales
    )
    if existing_sales:
        return existing_sales[0]
    db_sales = models.Sales(
        year=sales.year,
        department=sales.department,
        sales=sales.sales,
    )
    session.add(db_sales)
    session.commit()
    session.refresh(db_sales)
    return db_sales


def get_words(session: Session, skip: int = 0, limit: int = 100):
    statement = select(models.Word).offset(skip).limit(limit)
    return session.exec(statement).all()


def get_word_by_text(session: Session, word: str):
    statement = select(models.Word).where(models.Word.word == word)
    return session.exec(statement).first()


def create_word(session: Session, word: schemas.WordCreate):
    db_word = models.Word(word=word.word)
    session.add(db_word)
    session.commit()
    session.refresh(db_word)
    return db_word
