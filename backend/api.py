from aiohttp import web
from aiohttp.web import json_response
from database import get_db_connection

async def get_features(request):
    """
    GET /features: Returns a list of all features and their vote counts.
    """
    async with get_db_connection() as db:
        cursor = await db.execute("SELECT * FROM features ORDER BY votes DESC")
        features = await cursor.fetchall()
        
        # Convert rows to a list of dictionaries
        features_list = [dict(row) for row in features]
        
        # Use aiohttp's built-in json_response
        return json_response(features_list)

async def post_feature(request):
    """
    POST /features: Allows a user to post a new feature.
    """
    try:
        data = await request.json()
        feature_text = data.get('text')
    except json.JSONDecodeError:
        return web.Response(text='Invalid JSON body.', status=400)
    
    if not feature_text or not isinstance(feature_text, str):
        return web.Response(text='Feature text is required and must be a string.', status=400)
    
    async with get_db_connection() as db:
        await db.execute("INSERT INTO features (text) VALUES (?)", (feature_text,))
        await db.commit()
    
    return web.Response(text='Feature added.', status=201)

async def upvote_feature(request):
    """
    POST /features/{feature_id}/upvote: Allows a user to upvote a feature.
    """
    feature_id = request.match_info.get('feature_id')
    
    try:
        feature_id = int(feature_id)
    except (ValueError, TypeError):
        return web.Response(text='Invalid feature ID.', status=400)

    async with get_db_connection() as db:
        cursor = await db.execute(
            "UPDATE features SET votes = votes + 1 WHERE id = ?",
            (feature_id,)
        )
        await db.commit()
        
        if cursor.rowcount == 0:
            return web.Response(text='Feature not found.', status=404)
    
    return web.Response(text='Feature upvoted.', status=200)