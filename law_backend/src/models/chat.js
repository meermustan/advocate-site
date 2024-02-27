import mongoose from "mongoose";
const { Schema, model } = mongoose;

const chatSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "User" },
    lawyer: { type: Schema.Types.ObjectId, ref: "User" },
    job: { type: Schema.Types.ObjectId, ref: "Job" },
    clientUnread: { type: Boolean },
    lawyerUnread: { type: Boolean },
    messages: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Chat = model("Chat", chatSchema);

export default Chat;
