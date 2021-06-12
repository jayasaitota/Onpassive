import mongoose from 'mongoose';

/**
 * Token Schema
 */
const TokenSchema = new mongoose.Schema({
  accessToken: String,
  expires: Number,
  user: String,
  created: {
    type: Date,
    default: Date.now
  }
});

/**
 * Statics
 */
TokenSchema.statics = {

  /**
   * save and update token
   * @param token
   */
  saveDetails(token) {
    return token.save()
      .then((token) => {
        if (token) {
          return token;
        }
        return null
      });
  },

  /**
   * Find unique user token.
   * @param {objectId} userId.
   * @returns {Token}
   */
  findUniqueToken(userId) {
    return this.findOne({
      user: userId
    })
      .exec()
      .then((token) => token);
  }
};

/**
 * @typedef Token
 */
export default mongoose.model('Token', TokenSchema);