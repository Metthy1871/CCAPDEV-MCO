import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import config from '../config/env.js';
import postController from '../controllers/post.controller.js';
import commentRouter from './comment.routes.js';
import { protect } from '../middlewares/auth.middleware.js'; // protect middlware attaches the authenticated user to req.user

const postRouter = Router();

const hasSearchQuery = (req) => {
    const hasKeyword = typeof req.query.keyword === 'string' && req.query.keyword.trim().length > 0;
    const hasTags = req.query.tags && req.query.tags.length > 0;
    
    return hasKeyword || hasTags;
};

const searchLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: config.rateLimitSearchMax,
    message: {
        success: false,
        message: 'Too many search requests, please try again later.'
    },
    // only rate limit when this endpoint is used for search
    skip: (req) => !hasSearchQuery(req),
    skipFailedRequests: true
});



postRouter.use('/:postId/comments', commentRouter);

postRouter.get('/', searchLimiter, postController.getAllPosts);
postRouter.get('/user/:userId', postController.getPostsByUser);
postRouter.get('/:postId', postController.getPostById);
postRouter.post('/', protect, postController.createPost);
postRouter.put('/:postId', protect, postController.updatePost);
postRouter.delete('/:postId', protect, postController.deletePost);
postRouter.put('/:postId/vote', protect, postController.togglePostVote);


export default postRouter;