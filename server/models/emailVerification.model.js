import mongoose from 'mongoose';

/**
 * EmailVerification Schema
 */
const EmailVerificationSchema = new mongoose.Schema({
  token: String,
  expires: Number,
  userId: String,
  type:Number, // 1 for forgotPasword
  active:{
    type:Boolean,
    default:true
  },
  created: {
    type: Date,
    default: Date.now
  },
});

/**
 * @typedef EmailVerification
 */
export default mongoose.model('EmailVerification', EmailVerificationSchema);