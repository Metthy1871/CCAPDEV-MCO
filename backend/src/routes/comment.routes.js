import { Router } from 'express';
import commentController from '../controllers/comment.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const commentRouter = Router({ mergeParams: true }); // mergeParams allows access to postId from postRouter

commentRouter.get('/', commentController.getCommentsByPost);
commentRouter.post('/', protect, commentController.createComment);
commentRouter.put('/:commentId', protect, commentController.updateComment);
commentRouter.delete('/:commentId', protect, commentController.deleteComment);
commentRouter.put('/:commentId/vote', protect, commentController.toggleCommentVote);

export default commentRouter;