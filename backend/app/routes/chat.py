from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.utils.dependencies import get_current_user
from app.models import User, Conversation, Message
from app.schemas import ChatRequest
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.get("/me")
def get_my_data(
    current_user: User = Depends(get_current_user),
):
    return {
        "message": f"Hello {current_user.username}, you are authenticated!"
    }


@router.post("/")
def chat(
    data: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # 1 Get or create conversation
    if data.conversation_id:
        convo = db.query(Conversation).filter(
            Conversation.id == data.conversation_id,
            Conversation.user_id == current_user.id
        ).first()

        if not convo:
            raise HTTPException(status_code=404, detail="Conversation not found")
    else:
        convo = Conversation(user_id=current_user.id, title="New Chat")
        db.add(convo)
        db.commit()
        db.refresh(convo)

    # 2 Save user message
    user_msg = Message(
        conversation_id=convo.id,
        role="user",
        content=data.message
    )
    db.add(user_msg)
    db.commit()

    # 3 Send message to AI
    try:
        print("Using Groq key:", os.getenv("GROQ_API_KEY"))

        response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": data.message}],
    )
        reply_text = response.choices[0].message.content

    except Exception as e:
        print("FULL AI ERROR:", str(e))
        reply_text = f"AI error: {str(e)}"
    # 4 Save AI reply
    bot_msg = Message(
        conversation_id=convo.id,
        role="bot",
        content=reply_text
    )
    db.add(bot_msg)
    db.commit()

    return {
        "conversation_id": convo.id,
        "reply": reply_text
    }
@router.get("/conversations")
def get_conversations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    convos = db.query(Conversation).filter(
        Conversation.user_id == current_user.id
    ).order_by(Conversation.created_at.desc()).all()

    return [
        {"id": c.id, "title": c.title, "created_at": c.created_at}
        for c in convos
    ]
@router.get("/messages/{conversation_id}")
def get_messages(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    convo = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id
    ).first()

    if not convo:
        raise HTTPException(404, "Conversation not found")

    msgs = db.query(Message).filter(
        Message.conversation_id == conversation_id
    ).order_by(Message.timestamp.asc()).all()

    return [{"role": m.role, "text": m.content} for m in msgs]

@router.delete("/conversation/{conversation_id}")
def delete_conversation(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    convo = db.query(Conversation).filter(
        Conversation.id == conversation_id,
        Conversation.user_id == current_user.id
    ).first()

    if not convo:
        raise HTTPException(status_code=404, detail="Conversation not found")

    # Delete messages first
    db.query(Message).filter(Message.conversation_id == conversation_id).delete()

    # Delete conversation
    db.delete(convo)
    db.commit()

    return {"message": "Conversation deleted"}

