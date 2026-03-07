from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, sessions, coaches, evenements, contact
from scheduler import start_scheduler
import uvicorn

app = FastAPI(title="Hybride Club API")

# CORS
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(sessions.router)
app.include_router(coaches.router)
app.include_router(evenements.router)
app.include_router(contact.router)

@app.on_event("startup")
async def startup_event():
    start_scheduler()

@app.get("/")
def read_root():
    return {"message": "Welcome to Hybride Club API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
