import aiosqlite

DATABASE_URL = 'features.db'

class DBConnection:
    def __init__(self, db_path):
        self.db_path = db_path
        self.conn = None

    async def __aenter__(self):
        self.conn = await aiosqlite.connect(self.db_path)
        self.conn.row_factory = aiosqlite.Row
        return self.conn

    async def __aexit__(self, exc_type, exc, tb):
        await self.conn.close()

def get_db_connection():
    """
    Returns an instance of the DBConnection asynchronous context manager.
    """
    return DBConnection(DATABASE_URL)

async def setup_database():
    """
    Initializes the database and creates the features table if it doesn't exist.
    """
    async with get_db_connection() as db:
        await db.execute('''
            CREATE TABLE IF NOT EXISTS features (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                text TEXT NOT NULL,
                votes INTEGER NOT NULL DEFAULT 0
            )
        ''')
        await db.commit()