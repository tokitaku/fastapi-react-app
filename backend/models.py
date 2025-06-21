from sqlmodel import SQLModel, Field


# パスワードは本来ハッシュ化して保存すべきですが、現状は平文で保存されています。
# セキュリティ向上のため、今後はハッシュ化を検討してください。
class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True, index=True)
    name: str = Field(index=True)
    password: str = Field(index=True)
    is_active: bool = Field(default=True)


class Sales(SQLModel, table=True):
    year: int = Field(primary_key=True, index=True)
    department: str = Field(primary_key=True, index=True)
    sales: float = Field(default=0.0)


class Word(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True, index=True)
    word: str = Field(index=True)
