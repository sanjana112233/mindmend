from celery import Celery
import time
import random

# Configure Celery (Using 127.0.0.1 for Windows compatibility)
celery_app = Celery(
    'tasks', 
    broker='redis://127.0.0.1:6379/0', 
    backend='redis://127.0.0.1:6379/0'
)

# --- EXISTING TASK: WEEKLY REPORT ---
@celery_app.task
def generate_weekly_report_task(user_id, journal_texts):
    print(f"--- [WORKER] Starting report generation for user {user_id} ---")
    time.sleep(5) 
    score = random.randint(70, 100)
    keywords = ["resilience", "calm", "growth", "mindfulness"]
    insight = "Your journaling shows a positive trend in emotional resilience this week."
    result = {
        "user_id": user_id,
        "wellness_score": score,
        "top_keywords": keywords,
        "ai_insight": insight,
        "status": "completed"
    }
    print(f"--- [WORKER] Finished report for {user_id} ---")
    return result

# --- NEW TASK: SEND EMAIL (Added this) ---
@celery_app.task
def send_email_task(email, subject, body):
    """
    Simulates sending an email asynchronously.
    """
    print(f"--- [EMAIL WORKER] Processing email for: {email} ---")
    print(f"Subject: {subject}")
    # Simulate network delay
    time.sleep(2) 
    print(f"--- [EMAIL WORKER] Email SENT to {email} ---")
    return f"Sent to {email}"