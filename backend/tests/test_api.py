import pytest
from aiohttp import web
import aiosqlite
from aiohttp.web import json_response
from aiohttp.test_utils import AioHTTPTestCase, unittest_run_loop

# Assume these are your original backend files
from backend.api import get_features, post_feature, upvote_feature
from backend.database import DBConnection, setup_database

# Pytest fixture to create an in-memory database for each test
@pytest.fixture
async def db_connection():
    conn = await aiosqlite.connect(":memory:")
    conn.row_factory = aiosqlite.Row
    async with DBConnection(":memory:") as db:
        await db.execute('''
            CREATE TABLE IF NOT EXISTS features (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT NOT NULL,
                votes INTEGER NOT NULL DEFAULT 0
            )
        ''')
        await db.commit()
    yield conn
    await conn.close()

# Pytest fixture to set up the aiohttp application with a test client
@pytest.fixture
def aiohttp_client(loop, aiohttp_client):
    app = web.Application()
    app.router.add_get('/features', get_features)
    app.router.add_post('/features', post_feature)
    app.router.add_post('/features/{feature_id}/upvote', upvote_feature)
    return loop.run_until_complete(aiohttp_client(app))

# Test cases for the API endpoints
async def test_get_features_empty(aiohttp_client):
    """Test that GET /features returns an empty list initially."""
    resp = await aiohttp_client.get("/features")
    assert resp.status == 200
    data = await resp.json()
    assert data == []

async def test_post_and_get_features(aiohttp_client):
    """Test that a new feature can be posted and then retrieved."""
    new_feature = {"text": "Test Feature"}
    resp = await aiohttp_client.post("/features", json=new_feature)
    assert resp.status == 201
    
    resp = await aiohttp_client.get("/features")
    assert resp.status == 200
    data = await resp.json()
    assert len(data) == 1
    assert data[0]["text"] == "Test Feature"
    assert data[0]["votes"] == 0

async def test_upvote_feature_success(aiohttp_client):
    """Test that a feature can be upvoted successfully."""
    new_feature = {"text": "Upvote Me"}
    await aiohttp_client.post("/features", json=new_feature)
    
    resp = await aiohttp_client.get("/features")
    data = await resp.json()
    feature_id = data[0]["id"]
    
    resp = await aiohttp_client.post(f"/features/{feature_id}/upvote")
    assert resp.status == 200
    
    resp = await aiohttp_client.get("/features")
    data = await resp.json()
    assert data[0]["votes"] == 1

async def test_upvote_feature_not_found(aiohttp_client):
    """Test that upvoting a non-existent feature returns a 404."""
    resp = await aiohttp_client.post("/features/999/upvote")
    assert resp.status == 404

async def test_post_feature_invalid_body(aiohttp_client):
    """Test that posting a feature with invalid data returns a 400."""
    resp = await aiohttp_client.post("/features", json={})
    assert resp.status == 400
    
    resp = await aiohttp_client.post("/features", data="not json")
    assert resp.status == 400