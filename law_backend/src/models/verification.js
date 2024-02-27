import mongoose from "mongoose";

const { Schema, model } = mongoose;

const clientSchema = new Schema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  case_type: {
    type: String
  }
}, { timestamps: true });

const verificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  CNIC_front_image_url: {
    type: String,
    required: true
  },
  CNIC_back_image_url: {
    type: String,
    required: true
  },
  BAR_front_image_url: {
    type: String,
    required: true
  },
  BAR_back_image_url: {
    type: String,
    required: true
  },
  BAR_no: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  main_court_of_practice: {
    type: String,
    required: true
  },
  clients: {
    type: [clientSchema],
    default: []
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'refuted'],
    default: 'pending'
  },
  description: {
    type: String
  }
}, { timestamps: true });

const Verification = model("Verification", verificationSchema);

export default Verification;
