from motor.motor_asyncio import AsyncIOMotorClient
import os

def init_db():
    try:
        MONGO_URI = os.getenv("MONGO_URL", "mongodb://localhost:27017")
        client = AsyncIOMotorClient(MONGO_URI)
        db = client["testdb"]
        return {
            "items_collection": db["items"],
            "users_collection": db["users"]
        }
    except Exception as e:
        raise Exception(f"Failed to connect to MongoDB: {str(e)}")