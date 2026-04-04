import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { updateUserProfile, getUserProfile, getTotalMembers, deleteUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.route('/stats').get(getTotalMembers);
userRouter.route('/profile')
    .put(protect, updateUserProfile)
    .delete(protect, deleteUser);
userRouter.route('/:username').get(getUserProfile);

export default userRouter;