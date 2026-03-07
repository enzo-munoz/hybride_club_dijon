from apscheduler.schedulers.asyncio import AsyncIOScheduler
from datetime import datetime, timedelta
import pytz
from database import sessions_col
import asyncio

# Timezone
PARIS_TZ = pytz.timezone("Europe/Paris")

async def create_weekly_sessions():
    """Generates 6 sessions (Mon-Sat) for the upcoming week."""
    print("Generating weekly sessions...")
    
    today = datetime.now(PARIS_TZ)
    # Calculate next Monday (start of the week)
    days_ahead = 7 - today.weekday()
    if days_ahead <= 0:
        days_ahead += 7
        
    start_date = today + timedelta(days=days_ahead)
    start_date = start_date.replace(hour=18, minute=0, second=0, microsecond=0)
    
    # Check if sessions already exist for this week
    existing = await sessions_col.find_one({
        "date": {"$gte": start_date, "$lt": start_date + timedelta(days=7)}
    })
    if existing:
        print(f"Sessions for week of {start_date.date()} already exist.")
        return 0

    sessions = []
    days_names = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    
    for i in range(6): # 6 sessions (Mon-Sat)
        session_date = start_date + timedelta(days=i)
        
        # Deadline: Previous day at 23:59
        deadline = session_date - timedelta(days=1)
        deadline = deadline.replace(hour=23, minute=59, second=0)
        
        session = {
            "date": session_date,
            "heure_fin": session_date.replace(hour=20, minute=0),
            "deadline_vote": deadline,
            "jour": days_names[i],
            "reponses": [],
            "verrouille": False
        }
        sessions.append(session)

    if sessions:
        await sessions_col.insert_many(sessions)
        print(f"Created {len(sessions)} sessions for week of {start_date.date()}")
        return len(sessions)
    return 0

scheduler = AsyncIOScheduler()

def start_scheduler():
    # Schedule every Sunday at 8:00 AM Paris time
    scheduler.add_job(create_weekly_sessions, 'cron', day_of_week='sun', hour=8, minute=0, timezone=PARIS_TZ)
    scheduler.start()
    print("Scheduler started.")
