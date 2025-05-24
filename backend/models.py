from sqlmodel import SQLModel, Field


class Users(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True, index=True)
    name: str = Field(index=True)
    password: str = Field(index=True)
    is_active: bool = Field(default=True)


class Sales(SQLModel, table=True):

    year: int = Field(primary_key=True, index=True)
    department: str = Field(primary_key=True, index=True)
    sales: float = Field(default=0.0)
