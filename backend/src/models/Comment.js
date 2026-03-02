import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

// comment schema references the post
// in MongoDB, no single document can be larger than 16 megabytes

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, 'Please provide comment'],
            minLength: [5, 'Comment must be at least 5 characters long'],
            maxLength: [10000, 'Comment exceeds the maximum allowed length'],
            trim: true
        },
        author: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        post: {
            type: ObjectId,
            ref: 'Post',
            required: true
        },
        parentComment: {
            type: ObjectId,
            ref: 'Comment',
            default: null
        },
        upvotes: [{ // use array of UserIDs to track which user has upvoted
            type: ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true // sets the createdAt and updatedAt fields
    }
);

const Comment = model('Comment', commentSchema);
export default Comment;