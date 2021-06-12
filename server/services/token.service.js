import Token from '../models/token.model';

import { generateUUID } from '../utils/service.utils';



/**
 * Get unique token details by accessToken
 * @returns {token}
 */
export const getTokenDetails = (token) => {
  return Token
    .findOne({ accessToken: token })
    .then((token) => token);
}

/**
 * set token variables
 * @returns {token}
 */
const setTokenVariables = (req) => {
  let token = new Token();
  const { _id, refreshToken } = req.user;
  token.accessToken = generateUUID(refreshToken);
  token.expires = new Date().getTime() + 900000;//Update the expire time to 15 min
  token.user = _id;
  req.token = token;
}

/**
 * remove exisisting token and save new token
 * @param req
 * @returns {}
 */
export const removeTokenAndSaveNewToken = async (req) => {
  let token;
  token = await Token.findUniqueToken(req.user.id);
  if (token) {
    token.remove();
  }
  // set token variables
  setTokenVariables(req);
  // save the token
  let tokenDetails = await Token.saveDetails(req.token);
  if (tokenDetails) {
    return { accessToken: tokenDetails.accessToken }
  } else {
    return { accessToken: null }
  }

}