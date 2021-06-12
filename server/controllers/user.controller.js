import User from '../models/user.model';

import { removeTokenAndSaveNewToken } from '../services/token.service';

import { generateUUID } from '../utils/service.utils';

const errorResponse = { errMessage: "Something went worng, please try again later." };

/**
 * Load User and append to req.
 * @param req
 * @param res
 * @param next
 */
const load = async (req, res, next) => {
  try {
    let { statusCode, user } = await User.get(req.params.userId);
    if (statusCode == 200) {
      req.user = user;
      next()
    } else {
      return res.status(400).json({ errMessage: "User not found." })
    }
  } catch (err) {
    console.error(err)
    return res.status(400).json(errorResponse)
  }

};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {message, userId,id}
 */
const create = async (req, res) => {
  try {
    const user = new User(req.body);

    //Generate refresh token on user level to generate access token for authentication
    user.refreshToken = generateUUID(`${req.body.email}:${(new Date()).getTime().toString(36)}`);

    if (await User.findUniqueEmail(req.body.email))
      return res.status(400).json({ errMessage: "Email already existes" })

    const { statusCode, user: UserDetails } = await User.saveDetails(user);
    if (statusCode == 200) {
      return res.status(200).json({ sucessMessage: "User Create Successfully.", userId: UserDetails._id })
    } else {
      return res.status(400).json(errorResponse)
    }
  } catch (err) {
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}


/**
 * Get User
 * @param req
 * @param res
 * @returns {details: user}
 */

const get = async (req, res) => {
  try {
    let user = req.user;
    user.password =undefined
    user.salt=undefined
    user.refreshToken=undefined
    return res.status(200).json({ details: user });
  } catch (err) {
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

/**
 * Update existing User
 * @param req
 * @param res
 * @param next
 * @returns { userId: userId, respMessage: respMessage }
 */
const update = async (req, res) => {
  try {
    let user = req.user;
    user = Object.assign(user, req.body);
    user.updated = Date.now();
    const { statusCode, user: userDetails } = await User.saveDetails(user);
    if (statusCode == 200) {
      return res.status(200).json({ respMessage: "User Updated Successfully.", userId: userDetails._id })
    } else {
      return res.status(400).json(errorResponse)
    }
  } catch (err) {
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

/**
 * Get User list. based on criteria
 * @param req
 * @param res
 * @param next
 * @returns {users: users, pagination: pagination}
 */
const list = async (req, res) => {
  try {
    const query = generateListQuery(req.query = {});
    if (query.page === 1) {
      // total count
      query.pagination.totalCount = await User.totalCount(query);
    }
    const users = await User.list({ query });

    return res.status(200).json({
      users,
      pagination: query.pagination
    });
  } catch (err) {
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

/**
 * Delete Category.
 * @param req
 * @param res
 * @param next
 * @returns { userId: userId, respMessage: respMessage }
 */
const remove = async (req, res) => {
  try {
    let user = req.user;
    user.updated = Date.now();
    user.active = false
    const { statusCode, user: userDetails } = await User.saveDetails(user);
    if (statusCode == 200) {
      return res.status(200).json({ respMessage: "User Deleted Successfully.", userId: userDetails._id })
    } else {
      return res.status(400).json(errorResponse)
    }
  } catch (err) {
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {message,accesstoken}
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUniqueEmail(email);
    if (!user) {
      return res.status(400).json({ errMessage: "Please enter valid email" });
    }
    // compare authenticate password for user
    if (!user || !user.authenticate(password)) {
      return res.status(400).json({ errMessage: "Please enter valid password" });
    }
    req.user = user;
    let { accessToken } = await removeTokenAndSaveNewToken(req)
    if (!accessToken) {
      return res.status(400).json(errorResponse)
    }
    return res.status(200).json({ sucessMessage: "Login Success.", accessToken: accessToken });
  } catch (err) {
    console.error(err)
    return res.status(400).json(errorResponse)
  }
}

export default {
  create,
  load,
  get,
  list,
  update,
  list,
  remove,
  login
}