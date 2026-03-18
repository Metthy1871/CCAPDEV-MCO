import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { updateUserProfile, getUserProfile } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.route('/profile').put(protect, updateUserProfile);
userRouter.route('/:username').get(getUserProfile);

export default userRouter;