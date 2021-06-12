import express from 'express';


import UserRoutes from './user.route';

const router = express.Router();

//Mount User routues to /api/users
router.use('/users',UserRoutes)

export default router