import { Router } from 'express';
import commentRouter from './comment.routes.js';

const postRouter = Router();

postRouter.use('/:postId/comments', commentRouter);

export default postRouter;