import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    lawyer: { type: Schema.Types.ObjectId, ref: "User" },
    client: { type: Schema.Types.ObjectId, ref: "User" },
    job: { type: Schema.Types.ObjectId, ref: "Job" },
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);
export default Review;
