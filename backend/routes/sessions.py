from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timedelta, timezone
from database import sessions_col, users_col, coaches_col
from auth import get_current_user
from bson import ObjectId
from scheduler import create_weekly_sessions

router = APIRouter(prefix="/api/sessions", tags=["sessions"])

class Vote(BaseModel):
    presence: bool 

@router.post("/generate")
async def generate_schedule(current_user: dict = Depends(get_current_user)):
    count = await create_weekly_sessions()
    if count == 0:
        return {"message": "Sessions for next week already exist."}
    return {"message": f"Generated {count} sessions for the upcoming week"}

@router.get("/semaine")
async def get_weekly_sessions(current_user: dict = Depends(get_current_user)):
    today = datetime.utcnow()
    last_monday = today - timedelta(days=today.weekday())
    last_monday = last_monday.replace(hour=0, minute=0, second=0, microsecond=0)
    
    cursor = sessions_col.find({"date": {"$gte": last_monday}}).sort("date", 1).limit(6)
    sessions = await cursor.to_list(length=6)
    
    for session in sessions:
        session["id"] = str(session["_id"])
        del session["_id"]
        
        # Ensure UTC timezone for frontend display
        if session.get("date") and session["date"].tzinfo is None:
            session["date"] = session["date"].replace(tzinfo=timezone.utc)
        if session.get("heure_fin") and session["heure_fin"].tzinfo is None:
            session["heure_fin"] = session["heure_fin"].replace(tzinfo=timezone.utc)
        if session.get("deadline_vote") and session["deadline_vote"].tzinfo is None:
            session["deadline_vote"] = session["deadline_vote"].replace(tzinfo=timezone.utc)
        
        user_vote = next((r for r in session.get("reponses", []) if r["user_id"] == current_user["email"]), None)
        session["user_vote"] = user_vote
        
    return sessions

@router.post("/{session_id}/vote")
async def vote_session(session_id: str, vote: Vote, current_user: dict = Depends(get_current_user)):
    try:
        obj_id = ObjectId(session_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid session ID")
        
    session = await sessions_col.find_one({"_id": obj_id})
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    if session["deadline_vote"] < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Voting deadline passed")
        
    user = await users_col.find_one({"email": current_user["email"]})
    if not user:
        user = await coaches_col.find_one({"email": current_user["email"]})
        
    if not user:
         raise HTTPException(status_code=404, detail="User not found")
    
    response = {
        "user_id": current_user["email"],
        "prenom": user.get("prenom", "Unknown"),
        "presence": vote.presence,
        "date_reponse": datetime.utcnow()
    }
    
    await sessions_col.update_one(
        {"_id": obj_id},
        {"$pull": {"reponses": {"user_id": current_user["email"]}}}
    )
    
    await sessions_col.update_one(
        {"_id": obj_id},
        {"$push": {"reponses": response}}
    )
    
    return {"message": "Vote recorded"}

@router.put("/{session_id}/vote")
async def update_vote(session_id: str, vote: Vote, current_user: dict = Depends(get_current_user)):
    return await vote_session(session_id, vote, current_user)
