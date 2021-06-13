import express from 'express';

import AuthCntrl from '../controllers/auth.controller';


const router = express.Router();

// POST '/api/auth/login'
router.route('/login').post(AuthCntrl.login)

// POST '/api/auth/forgotPassword'
router.route('/forgotPassword').post(AuthCntrl.forgotPassword)

// POST '/api/auth/emailValidate'
router.route('/emailValidate').post(AuthCntrl.validateEmailLinks)

export default router