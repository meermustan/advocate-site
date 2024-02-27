import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    unSeen: 0,
    notifications: [],
  },
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload.notifications;
      state.unSeen = action.payload.unSeen;
    },
    addNotification(state, action) {
      state.notifications = [action.payload, ...state.notifications];
    },
    setUnSeen(state, action) {
      state.unSeen = action.payload == 0 ? 0 : state.unSeen + action.payload;
    },
  },
});

export const { setUnSeen, setNotifications, addNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
