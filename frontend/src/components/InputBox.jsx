import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage, addUserMessage } from "../features/chat/chatSlice";

export default function InputBox({ token }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  
  const { activeConversationId } = useSelector(state => state.chat);

  const handleSend = () => {
    if (!text.trim()) return;

    // Show user message instantly
    dispatch(addUserMessage(text));

    // Send to backend with conversation id
    dispatch(sendMessage({
      message: text,
      conversation_id: activeConversationId,
      token
    }));

    setText("");
  };

  return (
    <div style={{ display: "flex" }}>
      <input
        placeholder="Ask something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1 , marginRight:'10px',marginLeft:'10px'}}
      />
      <button style={{height:'35px'}} onClick={handleSend}>Send</button>
    </div>
  );
}
