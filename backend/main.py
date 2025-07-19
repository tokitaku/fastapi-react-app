from typing import Annotated
from contextlib import asynccontextmanager
import re

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Session
from .database import create_db_and_tables, get_session
from . import schemas
from . import crud

from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)


origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database configuration
SessionDep = Annotated[Session, Depends(get_session)]


# User routes
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, session: SessionDep):
    db_user = crud.get_user_by_name_and_password(session, user.name, user.password)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")

    try:
        return crud.create_user(session, user)
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")


@app.get("/users/", response_model=list[schemas.User])
def read_users(session: SessionDep, skip: int = 0, limit: int = 10):
    try:
        users = crud.get_users(session)
        return users[skip : skip + limit]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read users: {str(e)}")


@app.get("/user", response_model=schemas.User)
def read_user(name: str, password: str, session: SessionDep):
    try:
        db_user = crud.get_user_by_name_and_password(session, name, password)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return db_user
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read user: {str(e)}")


@app.post("/sales/", response_model=schemas.Sales)
def create_sales(sales: schemas.SalesCreate, session: SessionDep):
    try:
        db_sales = crud.get_sales_by_year_by_department(
            session, sales.year, sales.department, sales.sales
        )
        if db_sales:
            raise HTTPException(status_code=400, detail="Sales record already exists")

        return crud.create_sales(session, sales)
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create sales: {str(e)}")


@app.get("/sales/", response_model=list[schemas.Sales])
def read_sales(
    session: SessionDep,
    year: int = Query(None, description="Filter by year"),
    department: str = Query(None, description="Filter by department"),
):
    try:
        if year and department:
            sales = crud.get_sales_by_year_by_department(session, year, department)
        elif year:
            sales = crud.get_sales_by_year(session, year)
        else:
            sales = crud.get_sales(session)

        return sales
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read sales: {str(e)}")


@app.get("/sales/{year}", response_model=list[schemas.Sales])
def read_sales_by_year(year: int, session: SessionDep):
    try:
        sales = crud.get_sales_by_year(session, year)
        return sales
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to read sales by year: {str(e)}"
        )


# Word routes
@app.post("/words/", response_model=schemas.Word)
def create_word(word: schemas.WordCreate, session: SessionDep):
    db_word = crud.get_word_by_text(session, word.word)
    if db_word:
        raise HTTPException(status_code=400, detail="Word already exists")
    try:
        return crud.create_word(session, word)
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=500, detail=f"Failed to create word: {str(e)}"
        ) from e


@app.get("/words/", response_model=list[schemas.Word])
def read_words(session: SessionDep, skip: int = 0, limit: int = 10):
    try:
        words = crud.get_words(session, skip, limit)
        return words
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to read words: {str(e)}"
        ) from e


@app.get("/words/{word_text}", response_model=schemas.Word)
def get_word_by_text(word_text: str, session: SessionDep):
    """
    Get a specific word by its text
    """
    if not re.match(r"^[A-Za-z]+$", word_text):
        raise HTTPException(
            status_code=400, detail="Word must contain only English letters"
        )

    try:
        db_word = crud.get_word_by_text(session, word_text)
        if db_word is None:
            raise HTTPException(status_code=404, detail="Word not found")
        return db_word
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to get word: {str(e)}"
        ) from e
