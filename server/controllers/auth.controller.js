import config from '../config';

import User from '../models/user.model';
import EmailVerification from '../models/emailVerification.model';

import { removeTokenAndSaveNewToken } from '../services/token.service';


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
      return res.status(405).json({ errMessage: "Please enter valid email" });
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

const forgotPassword = async (req, res) => {
  const { email } = req.query;
  const user = await User.findUniqueEmail(email);
  if (!user) {
    return res.status(400).json({ errMessage: "Please enter valid email" });
  }
  let emailVerification = new EmailVerification();
  emailVerification.token = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
  emailVerification.expires = (new Date()).getTime() + config.emailExpirayTime;
  emailVerification.userId = user._id;
  emailVerification.type = 1;
  emailVerification = await emailVerification.save();
  //Email send functionality should be here
  //format http://localhost:4000/api/auth/emailValidate?token=kpurduyvso6q8124kj&type=1?
  return res.status(200).json({sucessMessage:"Email Sent Successfully",expires:`${config.emailExpirayTimeInMin} Minutes`})
}

const validateEmailLinks = async(req,res)=>{
  const {token,type} = req.query;
  if(!(token && type)){
    return res.status(400).json({ errMessage: "Invalid Link" });
  }
  let emailVerification = await EmailVerification.findOne({token,type,active:true});
  if(!emailVerification){
    return res.status(400).json({ errMessage: "Invalid Link" });
  }
  if(expires < new Date().getTime()){
    return res.status(400).json({ errMessage: "Link Expired" });
  }
  /**
   *   Cleint sent us back the same token with newPassword and confirmPassword.
   *   Then we will validate the same token and get the user and save password;
   */
 return res.redirect(`htpp://cleinturl.com/changerecoverpassword/${token}`);
}



export default {
  login,
  forgotPassword,
  validateEmailLinks
}