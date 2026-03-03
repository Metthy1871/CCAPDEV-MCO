import mongoose from 'mongoose';
import Post from '../models/Post.js';
import { SORT_POSTS_OPTIONS } from '../utils/constants.js';

const { ObjectId } = mongoose.Types;


// default sorting is by most recent
export const getAllPosts = async (sortBy = SORT_POSTS_OPTIONS.RECENT) => {
    try {
        switch (sortBy) {
            case SORT_POSTS_OPTIONS.POPULAR_ALL_TIME:
                const allTime = await Post.aggregate([
                    { $addFields: { voteCount: { $size: "$upvotes" } } }, // get the length of the upvotes array
                    { $sort: { voteCount: -1, createdAt: -1 } } // sort posts by vote count in descending order, and then by time of creation in descending order 
                ])

                return await Post.populate(allTime, { path: 'author', select: 'username'} );
            
            case SORT_POSTS_OPTIONS.POPULAR_RECENT: // sort by the most popular for posts created within the last seven days
                const sevenDaysAgo = new Date();
                // calculate the date exactly 7 days ago
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                const recentPopular = await Post.aggregate([
                    { $match: { createdAt: { $gte: sevenDaysAgo} } }, // filter posts created more than seven days ago
                    { $addFields: { voteCount: { $size: "$upvotes" } } },
                    { $sort: { voteCount: -1, createdAt: -1 } } // sort posts by vote count in descending order, and then by time of creation in descending order 
                ]);

                return await Post.populate(recentPopular, { path: 'author', select: 'username'} );

            case SORT_POSTS_OPTIONS.RECENT:
            case DEFAULT:
                const recentPosts = await Post.find()
                    .sort({ createdAt: -1 }) // sort by most recent
                    .populate('author', 'username');
                return recentPosts;
        }
        return allPosts;
    } catch (error) {
        throw error;
    }
}

export const getPostById = async (postId) => {
    try {
        const post = await Post.findById(postId).populate('author', 'username');
        return post;
    } catch (error) {
        throw error;
    }
}

export const getPostsByUser = async (userId, sortBy = SORT_POSTS_OPTIONS.RECENT) => {
    try {

        // cast the string Id to a MongoDB ObjectId for aggregate pipelines
        const userObjectId = new ObjectId()
        switch (sortBy) {
            case SORT_POSTS_OPTIONS.POPULAR_ALL_TIME:
                const allTime = await Post.aggregate([
                    { $match: { author: userObjectId } }, // get the user's posts
                    { $addFields: { voteCount: { $size: "$upvotes" } } }, // get the length of the upvotes array
                    { $sort: { voteCount: -1, createdAt: -1 } } // sort posts by vote count in descending order, and then by time of creation in descending order 
                ])

                return await Post.populate(allTime, { path: 'author', select: 'username'} );
            
            case SORT_POSTS_OPTIONS.POPULAR_RECENT: // sort by the most popular for posts created within the last seven days
                const sevenDaysAgo = new Date();
                // calculate the date exactly 7 days ago
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                const recentPopular = await Post.aggregate([
                    { $match: { 
                        author: userObjectId,
                        createdAt: { $gte: sevenDaysAgo} // filter out posts created more than seven days ago
                        } 
                    },
                    { $addFields: { voteCount: { $size: "$upvotes" } } },
                    { $sort: { voteCount: -1, createdAt: -1 } } // sort posts by vote count in descending order, and then by time of creation in descending order 
                ]);

                return await Post.populate(recentPopular, { path: 'author', select: 'username'} );

            case SORT_POSTS_OPTIONS.RECENT:
            case DEFAULT:
                const recentPosts = await Post.find({ author: userId })
                    .sort({ createdAt: -1 }) // sort by most recent
                    .populate('author', 'username');
                return recentPosts;
        }

    } catch (error) {
        throw error;
    }
}

export const createPost = async (title, content, author, tags) => {
    try {
        const newPost = await Post.create({
            title,
            content,
            author,
            tags
        });

        return newPost;
    } catch (error) {
        throw error;
    }
}

export const updatePost = async (title, content) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content },
            {
                new: true, // returns the updated document
                runValidators: true // check minlength/maxlength rules again
            }
        )
        return updatedPost;
    } catch (error) {
        throw error;
    }
}

export const deletePost = async (postId) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        return deletedPost;
    } catch (error) {
        throw error;
    }

}