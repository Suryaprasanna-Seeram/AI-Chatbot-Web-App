import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ message, token }) => {
    const res = await api.post(
      "/chat/",
      { message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
);

export const deleteConversation = createAsyncThunk(
  "chat/deleteConversation",
  async ({ conversationId, token }) => {
    await api.delete(`/chat/conversation/${conversationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return conversationId;
  }
);


export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (token) => {
    const res = await api.get("/chat/conversations", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ conversationId, token }) => {
    const res = await api.get(`/chat/messages/${conversationId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);


const chatSlice = createSlice({
  name: "chat",
  initialState: { messages: [], conversations: [],loading: false,activeConversationId: null, },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({ role: "user", text: action.payload });
    },
    clearChat: (state) => {
    state.messages = [];
    state.activeConversationId = null;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({ role: "bot", text: action.payload.reply });
        state.activeConversationId = action.payload.conversation_id;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
      state.conversations = action.payload;
      })
      // .addCase(fetchMessages.fulfilled, (state, action) => {
      // state.messages = action.payload;
      // })
      .addCase(deleteConversation.fulfilled, (state, action) => {
      state.conversations = state.conversations.filter(
      (c) => c.id !== action.payload
      );
      state.messages = [];
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload.messages || action.payload;
      state.activeConversationId = action.meta.arg.conversationId;
      })

      },
});

export const { addUserMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
