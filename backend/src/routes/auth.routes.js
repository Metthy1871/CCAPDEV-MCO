import { Router } from 'express';
import { registerUser,
         loginUser, 
         logoutUser,
         getMe
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);
authRouter.route('/logout').post(logoutUser);
authRouter.route('/me').get(protect, getMe);

export default authRouter;