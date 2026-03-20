import mongoose from 'mongoose';
import Comment from '../models/Comment.js';
import { SORT_COMMENTS_OPTIONS } from '../utils/constants.js';

const { ObjectId } = mongoose.Types;


// default sorting is by oldest, only top-level comments will be sorted
const getCommentsByPost = async (postId) => {
    try {

        // cast the string Id to a MongoDB ObjectId for aggregate pipelines
        const postObjectId = new ObjectId(postId)
        
        
            // case SORT_COMMENTS_OPTIONS.POPULAR:
            //     const popularComments = await Comment.aggregate([
            //         { $match: {post: postObjectId} },
            //         { $addFields: { voteCount: { $size: "$upvotes" } } }, // get the length of the upvotes array
            //         { $sort: { voteCount: -1, createdAt: -1 } } // sort posts by vote count in descending order, and then by time of creation in descending order 
            //     ])

            //     return await Comment.populate(popularComments, { path: 'author', select: 'username'} );

            // case SORT_COMMENTS_OPTIONS.OLDEST:
            // default:
        const oldestComments = await Comment.find({ post: postId })
            .sort({ createdAt: 1 }) // sort by oldest
            .populate('author', 'username');
        return oldestComments;
        
    } catch (error) {
        throw error;
    }
}

const createComment = async ({ content, userId, postId, parentComment}) => {
    try {
        const newComment = await Comment.create({
            content,
            author: userId,
            post: postId,
            parentComment
        });

        // populate username right away to render immediately without needing a refresh
        return await newComment.populate('author', 'username');
    } catch (error) {
        throw error;
    }
}

const updateComment = async ({ commentId, userId, newContent }) => {
    try {
        const updatedComment = await Comment.findOneAndUpdate(
            // check if comment is not deleted
            { _id: commentId, author: userId, isDeleted: false },
            { content: newContent } ,
            {
                new: true, // returns the updated document
                runValidators: true // check minlength/maxlength rules again
            }
        )

        return updatedComment;
    } catch (error) {
        throw error;
    }
}

// does a soft delete instead of a hard delete
const deleteComment = async ({ commentId, userId }) => {
    try {
        // update the content of a comment to indicate that is has been deleted
        const deletedComment = await Comment.findOneAndUpdate(
            { _id: commentId, author: userId },
            { 
                isDeleted: true, 
                content: "[deleted]" 
            },
            { new: true }
        );
        return deletedComment;
    } catch (error) {
        throw error;
    }
}

const toggleCommentVote = async ({ commentId, userId}) => {
    try {
        // check if user has already voted for the comment
        const comment = await Comment.findById(commentId);
        // safety check
        if (!comment) {
            throw new Error("Comment not found");
        }

        // check if comment is not deleted
        if (comment.isDeleted) {
            throw new Error("Cannot vote on a deleted comment");
        }

        // compare stringified IDs
        const hasVoted = comment.upvotes.some(id => id.toString() === userId.toString());

        if (hasVoted) {
            // keep all user IDs in the array except the matching user ID
            return await Comment.findByIdAndUpdate(
                commentId, 
                { $pull: { upvotes: userId } },
                { new: true } // return the updated document
            );
        } else {
            return await Comment.findByIdAndUpdate(
                commentId, 
                { $addToSet: { upvotes: userId } },
                { new: true } // return the updated document
            );
        }

    } catch (error) {
        throw error;
    }
}

export default {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
  toggleCommentVote
};