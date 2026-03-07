from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv('MONGO_URL')
MONGO_DB_NAME = os.getenv('MONGO_DB_NAME')

if not MONGO_URL:
    print("Warning: MONGO_URL not found in environment variables")

client = AsyncIOMotorClient(MONGO_URL)
db = client[MONGO_DB_NAME]

users_col = db['membres']
coaches_col = db['coaches']
sessions_col = db['sessions']
events_col = db['evenements']
