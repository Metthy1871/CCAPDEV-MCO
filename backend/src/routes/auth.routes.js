import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import config from '../config/env.js';
import { registerUser,
         loginUser, 
         logoutUser,
         getMe
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const authRouter = Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: config.rateLimitAuthMax,
    message: {
        success: false,
        message: 'Too many login attempts, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

authRouter.route('/register').post(authLimiter, registerUser);
authRouter.route('/login').post(authLimiter, loginUser);
authRouter.route('/logout').post(logoutUser);
authRouter.route('/me').get(protect, getMe);

export default authRouter;