import mongoose from 'mongoose';
import crypto from 'crypto';
import httpStatus from 'http-status';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  refreshToken: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date,
    default: Date.now()
  }
})


/**
* Hook a pre save method to hash the password
*/
UserSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Methods
 */
UserSchema.methods = {
  /**
  * Create instance method for authenticating user
  * @param {password}
  */
  authenticate(password) {
    return this.password === this.hashPassword(password);
  },

  /**
  * Create instance method for hashing a password
  * @param {password}
  */
  hashPassword(password) {
    if (this.salt && password) {
      return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
    } else {
      return password;
    }
  }
};

/**
 * Statics
 */
UserSchema.statics = {
  /**
  * save and update user
  * @param user
  * @returns {Promise<user, APIError>}
  */
  saveDetails(user) {
    return user.save()
      .then((user) => {
        if (user) {
          return {
            sucess: "OK",
            statusCode: httpStatus.OK,
            user
          };
        } else {
          return {
            error: "OK",
            statusCode: httpStatus.NOT_FOUND,
            errMessage: "User does't exist."
          };
        }
      });
  },

  /**
     * Get user
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<user, APIError>}
     */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return {
            sucess: "OK",
            statusCode: httpStatus.OK,
            user
          };
        } else {
          return {
            error: "OK",
            statusCode: httpStatus.NOT_FOUND,
            errMessage: "User does't exist."
          };
        }

      });
  },
  /**
     * List Categories
     * @returns {Promise<Users[]>}
     */
  list(query) {
    return this.find(query.filter, { password: 0, salt: 0, refreshToken: 0 })
      .sort(query.sorting)
      .skip((query.page - 1) * query.limit)
      .limit(query.limit)
      .exec();
  },

  /**
   * Count of Users records
   * @returns {Promise<Users[]>}
   */
  totalCount(query) {
    return this.find(query.filter)
      .count();
  },


  /**
   * Find unique email.
   * @param {string} email.
   * @returns {Promise<user[]>}
   */
  findUniqueEmail(email) {
    email = email.toLowerCase();
    return this.findOne({
      email: email,
      active: true
    }, { password: 0, salt: 0, refreshToken: 0 })
      .exec()
      .then((user) => user);
  }
};

export default mongoose.model('User', UserSchema);