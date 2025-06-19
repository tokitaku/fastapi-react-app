import pytest
from fastapi.testclient import TestClient

from backend.main import app


@pytest.fixture(scope="module")
def client():
    # start each test module with a clean database
    from backend.database import sqlite_file_name
    if sqlite_file_name.exists():
        sqlite_file_name.unlink()
    with TestClient(app) as c:
        yield c


def test_create_user(client):
    user_data = {
        "name": "テストユーザー",
        "password": "secret"
    }
    response = client.post("/users/", json=user_data)
    assert response.status_code == 200
    assert response.json()["name"] == user_data["name"]
    assert response.json()["is_active"] is True
    assert "id" in response.json()


def test_read_users(client):
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    # 前のテストでユーザーが作成されているはずなので1件以上存在することを確認
    assert len(response.json()) > 0


def test_read_user(client):
    params = {"name": "テストユーザー", "password": "secret"}
    response = client.get("/user", params=params)
    assert response.status_code == 200
    assert response.json()["name"] == params["name"]
