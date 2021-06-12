import express from 'express';

import UserController from '../controllers/user.controller';
import {isAllowed} from '../middleware/authenticate';

const router = express.Router();

// POST '/api/users=> Create User'
router.route('/').post(UserController.create)


//POST /api/users
router.route('/').all(isAllowed).post(UserController.create);

//PATCH /api/users/:userId
router.route('/:userId').all(isAllowed).patch(UserController.update);

//GET /api/users/:userId
router.route('/:userId').all(isAllowed).get(UserController.get);

//DELETE /api/users/:userId
router.route('/:userId').all(isAllowed).delete(UserController.remove);

// POST '/api/users/login'
router.route('/login').post(UserController.login)


/** Load user when API with userId route parameter is hit */
router.param("userId", UserController.load);


export default router;