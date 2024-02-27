import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    profile: { type: Schema.Types.ObjectId, ref: "Profile" },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    lawyerId: { type: String },
    courtName: { type: String },
    type: {
      type: String,
      enum: ["admin", "client", "lawyer"],
      default: "client",
    },
    language: {
      type: String,
      enum: ["ur", "en"],
      default: "en",
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    //NOTE: You can change the gender options acc. to your needs in the app.
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    city: {
      type: String,
    },
    timezone: {
      type: Number,
    },
    birthDate: {
      type: Date,
    },
    photoUrl: {
      type: String,
    },
    //NOTE: To check whether the account is active or not. When user deletes the account, you can store the information anonymously.
    isActivated: {
      type: Boolean,
      default: true,
    },
    //NOTE: To check whether the user skipped the email-verification step or not. You can delete the unverified accounts day by day.
    isVerified: {
      type: Boolean,
      required: true,
    },
    deviceId: {
      type: String,
    },
    //NOTE: You can add more options acc. to your need.
    platform: {
      type: String,
      enum: ["Android", "IOS", "Web"],
      default: "Web",
    },
    //NOTE: In case the user delete its account, you can store its non-personalized information anonymously.
    deletedAt: {
      type: Date,
    },
    verificationCode: {
      type: String,
    },
    verified_by_admin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
