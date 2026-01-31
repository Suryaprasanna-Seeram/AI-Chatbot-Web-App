import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Message from "./Message";
import InputBox from "./InputBox";
import { logout } from "../features/auth/authSlice";
import {fetchConversations,fetchMessages,deleteConversation,clearChat} from "../features/chat/chatSlice";
import "../styles/chat.css";

export default function ChatBox({ token }) {
  const dispatch = useDispatch();
  const { messages, loading, conversations } = useSelector((state) => state.chat);

  const handleNewChat = () => {
  dispatch(clearChat());
};

  useEffect(() => {
    dispatch(fetchConversations(token));
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="chat-layout">

      {/*  SIDEBAR */}
      <div className="sidebar">
        <h4>Chats</h4>
      
      <button className="new-chat-btn" onClick={handleNewChat}>
      + New Chat
      </button>
        {conversations?.map((c) => (
          <div key={c.id} className="chat-row">

            <span
              className="chat-title"
              onClick={() =>
                dispatch(fetchMessages({ conversationId: c.id, token }))
              }
            >
              {c.title}
            </span>

            <span
              className="delete-btn"
              onClick={() =>
                dispatch(deleteConversation({ conversationId: c.id, token }))
              }
            >
              🗑
            </span>

          </div>
        ))}
      </div>

      {/* CHAT AREA */}
      <div className="chat-area">
        <div className="chat-header">
          <h2>HAPO AI🤖</h2>
          <button style={{height:'40px', marginTop:'20px'}} onClick={handleLogout}>Logout</button>
        </div>

        <div className="messages">
          {messages.map((msg, i) => (
            <Message key={i} {...msg} />
          ))}
          {loading && <p>AI typing...</p>}
        </div>

        <InputBox token={token} />
      </div>

    </div>
  );
}
