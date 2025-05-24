from typing import Annotated
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, Query
from sqlmodel import Field, Session, SQLModel, create_engine, select
from database import engine, create_db_and_tables, get_session
import schemas
import models
import crud

# Database configuration
SessionDep = Annotated[Session, Depends(get_session)]


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)


# User routes
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, session: SessionDep):
    db_user = crud.get_user_by_name_and_password(session, user.name, user.password)
    if db_user:
        raise HTTPException(status_code=400, detail="User already exists")

    return crud.create_user(session, user)


@app.get("/users/", response_model=list[schemas.User])
def read_users(session: SessionDep, skip: int = 0, limit: int = 10):
    users = crud.get_users(session)
    return users[skip : skip + limit]


@app.get("/users/", response_model=schemas.User)
def read_user(name: str, password: str, session: SessionDep):
    db_user = crud.get_user_by_name_and_password(session, name, password)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
