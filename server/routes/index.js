import express from 'express';

import AuthRoutes from './auth.route';
import UserRoutes from './user.route';

const router = express.Router();

//Mount User routues to /api/users
router.use('/users',UserRoutes)

//Mount User routues to /api/auth
router.use('/auth',AuthRoutes)

export default router