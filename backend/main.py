from aiohttp import web
import aiohttp_cors
from api import get_features, post_feature, upvote_feature
from database import setup_database

async def main():
    """
    Main function to set up and run the web server.
    """
    await setup_database()
    app = web.Application()
    
    # Configure CORS settings
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
            allow_methods="*",
        )
    })
    
    # Add routes to the app
    app.router.add_get('/features', get_features)
    app.router.add_post('/features', post_feature)
    app.router.add_post('/features/{feature_id}/upvote', upvote_feature)
    
    # Configure CORS on all routes
    for route in list(app.router.routes()):
        cors.add(route)
        
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, '0.0.0.0', 8080)
    await site.start()
    
    print("Server started on http://0.0.0.0:8080")
    
    while True:
        await asyncio.sleep(3600)

if __name__ == '__main__':
    import asyncio
    asyncio.run(main())