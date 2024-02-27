import { createSlice } from "@reduxjs/toolkit";
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    activeChat: {},
  },
  reducers: {
    setChats(state, action) {
      state.chats = action?.payload;
    },
    addMessage(state, action) {
      let { message, chatId, unreadType = "_" } = action.payload;
      const chat = state.chats?.find((chat) => chat._id === chatId);
      if (chat) {
        if (chatId == state.activeChat._id) {
          state.activeChat = {
            ...state.activeChat,
            messages: [...state.activeChat?.messages, message],
          };
        }
        state.chats = [
          {
            ...chat,
            [unreadType]: true,
            messages: [...chat.messages, message],
          },
          ...state.chats.filter((chat) => chat._id !== chatId),
        ];
      }
    },
    setActiveChat(state, action) {
      let chatFound = state.chats?.find(
        (chat) => chat._id === action?.payload?.chatId
      );
      if (chatFound) {
        state.activeChat = chatFound;
        let temChats = state.chats.map((chat) => {
          if (chat._id == chatFound._id) {
            return {
              ...chat,
              [`${action?.payload?.type}Unread`]: false,
            };
          } else {
            return chat;
          }
        });
        state.chats = temChats;
      }
    },
  },
});

export const { setChats, addMessage, setActiveChat } = chatSlice.actions;

export default chatSlice.reducer;
