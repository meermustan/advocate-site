import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const proposalSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  job: { type: Schema.Types.ObjectId, ref: 'Job' },
  isActive: {
    type: Boolean,
    default: false,
  },
  isViewed: {
    type: Boolean,
    default: false,
  },
  summary: { type: String },
},
  {
    timestamps: true
  });

const Proposal = model('Proposal', proposalSchema)
export default Proposal