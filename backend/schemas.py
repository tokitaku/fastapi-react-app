from pydantic import BaseModel, Field


class UserBase(BaseModel):
    name: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True


class SalesBase(BaseModel):
    year: int
    department: str
    sales: float


class Sales(SalesBase):
    id: int

    class Config:
        from_attributes = True


class SalesCreate(SalesBase):
    pass
