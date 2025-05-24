from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session

from backend import crud, schemas
from backend.dependencies import get_session

router = APIRouter(
    prefix="/heroes",
    tags=["heroes"],
)

# Sessionの依存性
SessionDep = Annotated[Session, Depends(get_session)]


@router.post("/", response_model=schemas.HeroRead)
def create_hero(hero: schemas.HeroCreate, session: SessionDep):
    return crud.create_hero(session=session, hero_in=hero)


@router.get("/", response_model=List[schemas.HeroRead])
def read_heroes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    return crud.get_heroes(session=session, offset=offset, limit=limit)


@router.get("/{hero_id}", response_model=schemas.HeroRead)
def read_hero(hero_id: int, session: SessionDep):
    hero = crud.get_hero(session=session, hero_id=hero_id)
    if not hero:
        raise HTTPException(status_code=404, detail="Hero not found")
    return hero


@router.delete("/{hero_id}")
def delete_hero(hero_id: int, session: SessionDep):
    success = crud.delete_hero(session=session, hero_id=hero_id)
    if not success:
        raise HTTPException(status_code=404, detail="Hero not found")
    return {"ok": True}
