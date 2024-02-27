import mongoose from "mongoose";
const { Schema, model } = mongoose;

const jobSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    activeProposal: { type: Schema.Types.ObjectId, ref: "Proposal" },
    proposals: [{ type: Schema.Types.ObjectId, ref: "Proposal" }],
    clientReview: { type: Schema.Types.ObjectId, ref: "Review" },
    lawyerReview: { type: Schema.Types.ObjectId, ref: "Review" },
    title: { type: String },
    city: { type: String },
    summary: { type: String },
    estimatedBudget: { type: Number },
    sharedWith: { type: Array, default: [] },
    jobDocuments: {
      type: Array,
      default: [],
    },
    jobChat: {
      type: Array,
      default: [],
    },
    legalResearch: {
      type: Array,
      default: [],
    },  
    contract: { type: Schema.Types.ObjectId, ref: "Contract" },
    events: [
      {
        _id: { type: Schema.Types.ObjectId },
        title: { type: String },
        start: { type: Date },
        end: { type: Date },
        type: { type: String },
        status: { type: String },
        meeting_url: { type: String },
      },
    ],
    isVisible: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Job = model("Job", jobSchema);
export default Job;
