import { Router } from 'express';
import postController from '../controllers/post.controller.js';
import commentRouter from './comment.routes.js';
import { protect } from '../middlewares/auth.middleware.js'; // protect middlware attaches the authenticated user to req.user

const postRouter = Router();

postRouter.use('/:postId/comments', commentRouter);

postRouter.get('/', postController.getAllPosts);
postRouter.get('/:postId', postController.getPostById);
postRouter.get('/user/:userId', postController.getPostsByUser);
postRouter.post('/', protect, postController.createPost);
postRouter.put('/:postId', protect, postController.updatePost);
postRouter.delete('/:postId', protect, postController.deletePost);
postRouter.put('/:postId/vote', protect, postController.togglePostVote);


export default postRouter;