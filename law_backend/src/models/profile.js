import mongoose from "mongoose";
const { Schema, model } = mongoose;

const profileSchema = new Schema(
  {
    history: { type: String },
    about: { type: String },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

const Profile = model("Profile", profileSchema);
export default Profile;
