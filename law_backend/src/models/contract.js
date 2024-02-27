import mongoose from "mongoose";
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    client: { type: Schema.Types.ObjectId, ref: "User" },
    lawyer: { type: Schema.Types.ObjectId, ref: "User" },
    proposal: { type: Schema.Types.ObjectId, ref: "Proposal" },
    job: { type: Schema.Types.ObjectId, ref: "Job" },
    total: { type: Number },
    paid: { type: Number },
    secured: { type: Number },
    summary: { type: String },
    status: { type: String },
    milestones: [
      {
        _id: { type: Schema.Types.ObjectId },
        title: { type: String },
        total: { type: Number },
        summary: { type: String },
        paymentStatus: { type: String },
        status: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Contract = model("Contract", contactSchema);

export default Contract;
