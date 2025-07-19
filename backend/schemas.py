from pydantic import BaseModel, Field, field_validator
import re


class UserBase(BaseModel):
    name: str


class UserCreate(UserBase):
    password: str

    # @field_validator("password")
    # def validate_password(cls, v):
    #     # 最小8文字
    #     if len(v) < 8:
    #         raise ValueError("パスワードは8文字以上で入力してください。")
    #     # 英大文字・小文字・数字・記号のいずれか3種以上を含む
    #     count = 0
    #     if re.search(r"[A-Z]", v):
    #         count += 1
    #     if re.search(r"[a-z]", v):
    #         count += 1
    #     if re.search(r"[0-9]", v):
    #         count += 1
    #     if re.search(r"[^A-Za-z0-9]", v):
    #         count += 1
    #     if count < 3:
    #         raise ValueError("パスワードは英大文字・小文字・数字・記号のうち3種類以上を含めてください。")
    #     return v


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
    class Config:
        from_attributes = True


class SalesCreate(SalesBase):
    pass


class WordBase(BaseModel):
    word: str

    @field_validator("word")
    def validate_english(cls, v: str):
        if not re.fullmatch(r"[A-Za-z]+", v):
            raise ValueError("word must contain only English letters")
        return v


class WordCreate(WordBase):
    pass


class Word(WordBase):
    id: int

    class Config:
        from_attributes = True
