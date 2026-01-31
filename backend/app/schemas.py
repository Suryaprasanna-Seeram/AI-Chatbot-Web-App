from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    full_name: str
    username: str
    email: EmailStr
    phone: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ChatRequest(BaseModel):
    message: str
    conversation_id: int | None = None
