import config from '../config';

import { getTokenDetails } from '../services/token.service';
import { getBearerToken } from '../utils/service.utils';


const updateExpireTime = async (token, type, req) => {
  if (type === 'removeToken') {
    token.remove();
  } else {
    token.expires = new Date().getTime() + config.tokemExpirayTime;
    token.updated = new Date();
    token.save();
  }
};

export const isAllowed = async (req, res, next) => {
  let token = '';
  // get token from request headers
  if (req.headers && req.headers.authorization) {
    token = getBearerToken(req.headers);
  }
  if (token) {
    //gets the token details based on the access token
    let tokenData = await getTokenDetails(token);
    if (tokenData && tokenData.accessToken) {
      if (!(tokenData.expires < new Date().getTime())) {
        updateExpireTime(tokenData, 'updateTime');
        return next();
      } else {
        updateExpireTime(tokenData, 'removeToken');
        return res.status(400).json({ errMessage: "Session Expired.Please login again." });
      }
    } else {
      return res.status(400).json({ errMessage: "Session Expired.Please login again." });
    }
  } else {
    return res.status(400).json({ errMessage: "Invalid Token" });
  }
}