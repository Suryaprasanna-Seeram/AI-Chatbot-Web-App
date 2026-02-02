**AI Chatbot Web App**

A full-stack AI-powered chatbot application built with React + FastAPI + MySQL.
Users can register, log in, chat with AI, and view previous chat history.

**Features**

1. Authentication
- User Registration
- User Login (JWT Authentication)
- Secure password hashing
- Logout functionality

2. AI Chat System
- Send messages to AI
- Receive AI-generated responses
- Real-time chat UI
- Typing indicator

3. Chat History
- Conversations stored in database
- Sidebar showing previous chats
- Click to reopen old conversations

4. Modern UI
- Dark theme
- Chat bubbles
- Sidebar layout
- Separate CSS structure

** Tech Stack**

**Frontend**
- React (Vite)
- Redux Toolkit
- Axios
- CSS 

**Backend**
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication
- Groq / AI API

**Backend Setup**

1. Create virtual environment

   python -m venv venv
   venv\Scripts\activate

2. Install dependencies

    pip install fastapi uvicorn sqlalchemy pymysql python-dotenv passlib bcrypt python-jose

3. Create .env

   DATABASE_URL=mysql+pymysql://user:password@localhost/ai_chatbot
   SECRET_KEY=your_secret_key
   GROQ_API_KEY=your_ai_key

4. Run server

  uvicorn app.main:app --reload

Backend runs at:

http://127.0.0.1:8000

**Frontend Setup**

1. Install dependencies
 
  cd frontend
  npm install

2.  Start app
   
  npm run dev

Frontend runs at:

http://localhost:5173

**How It Works**

1. User logs in → receives JWT token
2. Token sent in headers for protected APIs
3. Messages stored in MySQL
4. AI response generated using external API
5. Conversations retrievable anytime


**Author**

Prasanna Seeram







