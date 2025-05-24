from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Hero API"}


def test_create_hero():
    hero_data = {
        "name": "テスト勇者",
        "secret_name": "秘密の名前",
        "age": 25
    }
    response = client.post("/heroes/", json=hero_data)
    assert response.status_code == 200
    assert response.json()["name"] == hero_data["name"]
    assert response.json()["secret_name"] == hero_data["secret_name"]
    assert response.json()["age"] == hero_data["age"]
    assert "id" in response.json()


def test_read_heroes():
    response = client.get("/heroes/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    # 少なくとも1つのヒーローが存在することを確認（前のテストで作成されたもの）
    assert len(response.json()) > 0
