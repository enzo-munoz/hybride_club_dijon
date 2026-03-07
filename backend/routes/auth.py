from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from database import users_col, coaches_col
from auth import get_password_hash, verify_password, create_access_token, get_current_user
from datetime import timedelta

router = APIRouter(prefix="/api/auth", tags=["auth"])

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    nom: str
    prenom: str
    niveau: str = "debutant"
    objectif: str = "Forme generale"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str  # Added role to response

@router.post("/register", response_model=Token)
async def register(user: UserCreate):
    existing_user = await users_col.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    user_dict["role"] = "member"
    user_dict["actif"] = True
    
    await users_col.insert_one(user_dict)
    
    access_token = create_access_token(data={"sub": user.email, "role": "member"})
    return {"access_token": access_token, "token_type": "bearer", "role": "member"}

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    # Check in members
    db_user = await users_col.find_one({"email": user.email})
    role = "member"
    
    # If not found in members, check in coaches
    if not db_user:
        db_user = await coaches_col.find_one({"email": user.email})
        role = "coach"
    
    if not db_user or "password" not in db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token(data={"sub": user.email, "role": role})
    return {"access_token": access_token, "token_type": "bearer", "role": role}

@router.get("/me")
async def read_users_me(current_user: dict = Depends(get_current_user)):
    email = current_user["email"]
    # Check both collections to return user data
    user = await users_col.find_one({"email": email}, {"password": 0, "_id": 0})
    if user:
        user["role"] = "member"
    else:
        user = await coaches_col.find_one({"email": email}, {"password": 0, "_id": 0})
        if user:
            user["role"] = "coach"
        
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
