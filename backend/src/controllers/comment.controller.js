import commentService from '../services/comment.service.js';
import catchAsync from '../utils/catchAsync.js';


const getCommentsByPost = catchAsync(async (req, res) => {
    const postId = req.params.postId;
    const { sortBy } = req.query;

    const comments = await commentService.getCommentsByPost(postId, sortBy);

    res.status(200).json({ success: true, data: comments });
});

const createComment = catchAsync(async (req, res) => {
    const content = req.body.content;
    const userId = req.user._id;
    const postId = req.params.postId;
    const parentComment = req.body.parentComment;

    const comment = await commentService.createComment({ content, userId, postId, parentComment });

    res.status(201).json({ success: true, data: comment });
});

const updateComment = catchAsync(async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user._id;
    const newContent = req.body.content;

    const updatedComment = await commentService.updateComment({ commentId, userId, newContent });

    if (!updatedComment) {
        return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    res.status(200).json({ success: true, data: updatedComment });
});

const deleteComment = catchAsync(async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const deletedComment = await commentService.deleteComment({ commentId, userId });

    if (!deletedComment) {
        return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    res.status(200).json({ success: true, data: deletedComment });
});

const toggleCommentVote = catchAsync(async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const commentVote = await commentService.toggleCommentVote({ commentId, userId });

    if (!commentVote) {
        return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    
    res.status(200).json({ success: true, data: commentVote });
});

export default {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
  toggleCommentVote
};