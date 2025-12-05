from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from textblob import TextBlob
import random
from celery.result import AsyncResult
# Import BOTH tasks
from tasks import generate_weekly_report_task, send_email_task

app = FastAPI()

# --- Data Models ---
class TextPayload(BaseModel):
    text: str

class ChatPayload(BaseModel):
    message: str

class ReportPayload(BaseModel):
    user_id: str
    journal_entries: list = []

# --- NEW: Email Model ---
class BulkEmailPayload(BaseModel):
    emails: list[str]
    subject: str
    body: str

# --- 🧠 SMART AI LOGIC (PRESERVED) ---

def get_smart_response(text: str, response_type="chat"):
    """
    Analyzes text for sentiment and specific emotional keywords 
    to generate a context-aware, supportive response.
    """
    text_lower = text.lower()
    blob = TextBlob(text)
    sentiment = blob.sentiment.polarity # -1.0 (Negative) to 1.0 (Positive)
    
    # 1. Detect Specific Emotions via Keywords
    keywords = {
        "anxious": ["anxious", "anxiety", "nervous", "scared", "worried", "panic", "fear", "stress"],
        "sad": ["sad", "depressed", "lonely", "cry", "hopeless", "down", "grief", "pain"],
        "angry": ["angry", "mad", "furious", "hate", "resent", "annoyed", "frustrated"],
        "tired": ["tired", "exhausted", "sleepy", "drained", "burnout", "fatigue", "overwhelmed"],
        "happy": ["happy", "excited", "great", "good", "joy", "amazing", "grateful", "love"]
    }
    
    detected_mood = "neutral"
    
    # Priority check: Scan for keywords first
    for mood, words in keywords.items():
        if any(word in text_lower for word in words):
            detected_mood = mood
            break
            
    # Fallback: If no keywords, use Sentiment Score
    if detected_mood == "neutral":
        if sentiment < -0.3:
            detected_mood = "sad"
        elif sentiment > 0.4:
            detected_mood = "happy"
            
    # 2. Response Templates (Rule: No Questions, Only Support)
    
    # JOURNAL AFFIRMATIONS (Short, reflective)
    journal_responses = {
        "anxious": [
            "You are safe in this moment. Breathe deeply.",
            "This feeling is temporary. You are stronger than your anxiety.",
            "Focus on the present. You can handle this one step at a time."
        ],
        "sad": [
            "Your feelings are valid. Be gentle with yourself today.",
            "It is okay to rest. Better days are coming.",
            "You are not alone. You are loved and supported."
        ],
        "angry": [
            "It is healthy to release this energy safely.",
            "Your passion shows you care, but peace is your priority.",
            "Take a deep breath and let the tension melt away."
        ],
        "tired": [
            "Rest is productive. Give yourself permission to pause.",
            "Listen to your body. You deserve to recharge.",
            "You have done enough today. Let go."
        ],
        "happy": [
            "Hold onto this light. You deserve this joy.",
            "Your positivity is radiant. Keep shining.",
            "Savor this moment. You have created this happiness."
        ],
        "neutral": [
            "Trust the journey. You are exactly where you need to be.",
            "Every day is a new beginning.",
            "Balance is key. You are doing great."
        ]
    }

    # CHATBOT RESPONSES (Conversational, Empathetic)
    chat_responses = {
        "anxious": [
            "I hear that you are feeling worried. Take a slow, deep breath with me.",
            "It is understandable to feel this way. You are safe here.",
            "Anxiety can be overwhelming, but remember it does not define you."
        ],
        "sad": [
            "I am sensing some heaviness in your words. I am here to hold space for you.",
            "It takes courage to face these feelings. You are doing the best you can.",
            "Please treat yourself with kindness right now. You matter."
        ],
        "angry": [
            "I hear your frustration. It is valid to feel this way.",
            "Letting it out is part of healing. I am listening.",
            "Take a moment to center yourself. You are in control."
        ],
        "tired": [
            "It sounds like you need some rest. Please prioritize your well-being.",
            "You have been carrying a lot. It is okay to put it down for a while.",
            "Resting is not quitting. Take care of yourself."
        ],
        "happy": [
            "It is wonderful to hear you sounding so positive!",
            "I am glad you are feeling good. Enjoy this feeling.",
            "That sounds amazing. You deserve this happiness."
        ],
        "neutral": [
            "I am here and listening. You can share whatever is on your mind.",
            "Thank you for sharing that with me. I am here to support you.",
            "I am here to support you through whatever comes up."
        ]
    }

    # Select Dictionary based on request type
    source_dict = chat_responses if response_type == "chat" else journal_responses
    
    # Get list of possible responses for the mood
    response_list = source_dict.get(detected_mood, source_dict["neutral"])
    
    return {
        "sentiment": sentiment,
        "text": random.choice(response_list),
        "mood": detected_mood
    }

# --- Endpoints ---

@app.post("/analyze-journal")
async def analyze_journal(payload: TextPayload):
    # Use the Smart Logic
    analysis = get_smart_response(payload.text, response_type="journal")
    return {
        "sentiment_score": analysis["sentiment"],
        "affirmation": analysis["text"]
    }

@app.post("/chat-response")
async def chat_response(payload: ChatPayload):
    # Use the Smart Logic
    analysis = get_smart_response(payload.message, response_type="chat")
    return {
        "bot_response": analysis["text"]
    }

@app.post("/trigger-report")
async def trigger_report(payload: ReportPayload):
    task = generate_weekly_report_task.delay(payload.user_id, payload.journal_entries)
    return {"task_id": task.id, "message": "Report generation started in background."}

# --- NEW: Check Report Status Endpoint ---
@app.get("/report-status/{task_id}")
async def get_report_status(task_id: str):
    # Check Redis for the result of the given task ID
    task_result = AsyncResult(task_id, app=celery_app) 
    
    if task_result.successful():
        return {
            "status": "SUCCESS",
            "result": task_result.result, # Returns the result dictionary (wellness_score, etc.)
        }
    elif task_result.failed():
        return {
            "status": "FAILURE",
            "result": "Task failed to process.",
        }
    else:
        return {
            "status": task_result.status,
            "result": "Processing or Pending...",
        }
# ... existing endpoints (analyze-journal, trigger-report, etc.)

# --- NEW: Bulk Email Endpoint (Added at end) ---
@app.post("/send-bulk-emails")
async def send_bulk_emails(payload: BulkEmailPayload):
    # Loop through the list and queue a task for EACH email
    count = 0
    for email in payload.emails:
        send_email_task.delay(email, payload.subject, payload.body)
        count += 1
    
    return {"message": f"Successfully queued {count} emails."}