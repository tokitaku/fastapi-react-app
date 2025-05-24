from pydantic import BaseModel


class HeroBase(BaseModel):
    name: str
    secret_name: str


class HeroCreate(HeroBase):
    age: int | None = None


class HeroRead(HeroBase):
    id: int
    age: int | None = None

    model_config = {
        "from_attributes": True
    }
