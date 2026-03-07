from fastapi import APIRouter
from database import events_col
from typing import List

router = APIRouter(prefix="/api/evenements", tags=["evenements"])

@router.get("/")
async def get_events():
    cursor = events_col.find().sort("date", 1)
    events = await cursor.to_list(length=20)
    for event in events:
        event["id"] = str(event["_id"])
        del event["_id"]
    return events
