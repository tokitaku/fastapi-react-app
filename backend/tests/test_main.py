import pytest
from fastapi.testclient import TestClient
from sqlmodel import create_engine, Session
from sqlalchemy.pool import StaticPool

from backend.main import app
from backend import database


@pytest.fixture
def client():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    database.engine = engine
    database.create_db_and_tables()

    def override_get_session():
        with Session(engine) as session:
            yield session

    app.dependency_overrides[database.get_session] = override_get_session

    with TestClient(app) as c:
        yield c

    app.dependency_overrides.clear()


def test_create_user(client):
    user = {"name": "alice", "password": "secret"}
    resp = client.post("/users/", json=user)
    assert resp.status_code == 200
    data = resp.json()
    assert data["name"] == user["name"]
    assert "id" in data


def test_create_user_duplicate(client):
    user = {"name": "bob", "password": "pass"}
    client.post("/users/", json=user)
    resp = client.post("/users/", json=user)
    assert resp.status_code == 400


def test_read_users(client):
    user = {"name": "carol", "password": "pw"}
    client.post("/users/", json=user)
    resp = client.get("/users/")
    assert resp.status_code == 200
    data = resp.json()
    assert any(u["name"] == "carol" for u in data)


def test_read_user(client):
    user = {"name": "dave", "password": "pwd"}
    client.post("/users/", json=user)
    resp = client.get("/user", params=user)
    assert resp.status_code == 200
    assert resp.json()["name"] == user["name"]


def test_create_and_read_sales(client):
    sales = {"year": 2024, "department": "R&D", "sales": 123.45}
    r = client.post("/sales/", json=sales)
    assert r.status_code == 200
    assert r.json() == sales

    resp_all = client.get("/sales/")
    assert resp_all.status_code == 200
    assert any(item["department"] == "R&D" for item in resp_all.json())

    resp_year = client.get("/sales/", params={"year": 2024})
    assert resp_year.status_code == 200
    assert all(item["year"] == 2024 for item in resp_year.json())

    resp_path = client.get("/sales/2024")
    assert resp_path.status_code == 200
    assert all(item["year"] == 2024 for item in resp_path.json())
