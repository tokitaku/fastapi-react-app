import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, Session, create_engine
import sqlalchemy

from .. import models
from ..main import app
from ..database import get_session


@pytest.fixture(name="client")
def client_fixture():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=sqlalchemy.pool.StaticPool,
    )
    SQLModel.metadata.create_all(engine)

    def get_session_override():
        with Session(engine) as session:
            yield session

    app.dependency_overrides[get_session] = get_session_override
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


def test_create_and_read_user(client):
    user_data = {"name": "alice", "password": "secret"}
    response = client.post("/users/", json=user_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == user_data["name"]
    assert data["is_active"] is True

    # read user
    response = client.get("/user", params=user_data)
    assert response.status_code == 200
    read_data = response.json()
    assert read_data["name"] == user_data["name"]


def test_create_duplicate_user(client):
    user_data = {"name": "bob", "password": "secret"}
    res1 = client.post("/users/", json=user_data)
    assert res1.status_code == 200
    res2 = client.post("/users/", json=user_data)
    assert res2.status_code == 400


def test_create_and_read_sales(client):
    # first create a user to satisfy foreign keys (not required because Sales doesn't reference user)
    sales_data = {"year": 2023, "department": "A", "sales": 10.5}
    res = client.post("/sales/", json=sales_data)
    assert res.status_code == 200
    data = res.json()
    assert data["year"] == sales_data["year"]
    assert data["department"] == sales_data["department"]

    # read sales without filters because the endpoint filters by sales=0 when
    # both year and department are provided
    res = client.get("/sales/")
    assert res.status_code == 200
    sales_list = res.json()
    assert any(s["year"] == 2023 and s["department"] == "A" for s in sales_list)


def test_read_sales_by_year(client):
    client.post("/sales/", json={"year": 2023, "department": "A", "sales": 10.0})
    client.post("/sales/", json={"year": 2023, "department": "B", "sales": 20.0})
    res = client.get("/sales/2023")
    assert res.status_code == 200
    data = res.json()
    assert len(data) == 2


def test_create_and_read_word(client):
    word_data = {"word": "Hello"}
    res = client.post("/words/", json=word_data)
    assert res.status_code == 200
    data = res.json()
    assert data["word"] == "Hello"

    res = client.get("/words/")
    assert res.status_code == 200
    words = res.json()
    assert any(w["word"] == "Hello" for w in words)


def test_create_duplicate_word(client):
    word_data = {"word": "World"}
    res1 = client.post("/words/", json=word_data)
    assert res1.status_code == 200
    res2 = client.post("/words/", json=word_data)
    assert res2.status_code == 400


def test_get_word_by_text_success(client):
    # まず単語を作成
    word_data = {"word": "Test"}
    create_response = client.post("/words/", json=word_data)
    assert create_response.status_code == 200

    # 作成した単語を検索
    response = client.get("/words/Test")
    assert response.status_code == 200
    data = response.json()
    assert data["word"] == "Test"


def test_get_word_by_text_not_found(client):
    response = client.get("/words/NonExistent")
    assert response.status_code == 404
    assert response.json()["detail"] == "Word not found"


def test_get_word_by_text_invalid_format(client):
    response = client.get("/words/test123")
    assert response.status_code == 400
    assert "English letters" in response.json()["detail"]


def test_get_word_by_text_special_characters(client):
    response = client.get("/words/hello!")
    assert response.status_code == 400
    assert "English letters" in response.json()["detail"]
