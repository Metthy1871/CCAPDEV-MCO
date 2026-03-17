import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

// add validator to limit the number of tags for each post
function numberOfTagsLimit(arr) {
    return arr.length <= 10;
}

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            minLength: [5, 'Title must be at least 10 characters long'],
            maxLength: [150, 'Title cannot exceed 150 characters'],
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Please provide post content'],
            minLength: [1, 'Post content must be at least 1 character long'],
            maxLength: [50000, 'Post content exceeds the maximum allowed length'],
            trim: true
        },
        author: {
            type: ObjectId,
            ref: 'User',
            required: true
        },
        upvotes: [{ // use array of UserIDs to track which user has upvoted
            type: ObjectId,
            ref: 'User'
        }],
        tags: {
            type: [{
                type: String,
                trim: true,
                lowercase: true,
                minLength: [2, 'Tag must be at least 2 characters long'],
                maxLength: [50, 'Tag cannot exceed 50 characters'],
            }],
            validate: [numberOfTagsLimit, 'Number of tags cannot exceed 5']
        }
    },
    {
        timestamps: true // sets the createdAt and updatedAt fields
    }
);


const Post = model('Post', postSchema);
export default Post;