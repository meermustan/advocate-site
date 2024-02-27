import mongoose from "mongoose";
const { Schema, model } = mongoose;

const notificationSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    isSeen: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
    job: { type: Schema.Types.ObjectId, ref: "Job" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    type: { type: String },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

export default Notification;
