import { Router } from 'express';
import { updateUserProfile,
         getUserProfile 
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.route('/:username').get(getUserProfile);
userRouter.route('/:id').put(updateUserProfile);
//userRouter.route('/:username/posts').get(getUserPosts);

export default userRouter;