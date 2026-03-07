from fastapi import APIRouter
from database import coaches_col
from typing import List

router = APIRouter(prefix="/api/coaches", tags=["coaches"])

@router.get("/")
async def get_coaches():
    cursor = coaches_col.find()
    coaches = await cursor.to_list(length=100)
    for coach in coaches:
        coach["id"] = str(coach["_id"])
        del coach["_id"]
    return coaches
