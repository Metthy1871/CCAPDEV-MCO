import postService from '../services/post.service.js';
import catchAsync from '../utils/catchAsync.js';


const getAllPosts = catchAsync(async (req, res) => {
    const { sortBy } = req.query;
    const allPosts = await postService.getAllPosts(sortBy);

    res.status(200).json({ success: true, data: allPosts });

});

const getPostById = catchAsync(async (req, res) => {
    const postId  = req.params.postId;
    const post = await postService.getPostById(postId);

    res.status(200).json({ success: true, data: post });
});

const getPostsByUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const { sortBy } = req.query;

    const posts = await postService.getPostsByUser(userId, sortBy);

    res.status(200).json({ success: true, data: posts });

});

const createPost = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const { title, content } = req.body;

    const newPost = await postService.createPost({ title, content, userId });

    res.status(201).json({ success: true, data: newPost});

});

const updatePost = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const { title, content } = req.body;
    const postId = req.params.postId;

    const updatedPost = await postService.updatePost({ postId, userId, title, content });

    if (!updatedPost) {
        return res.status(404).json({ success: false, message: "Post not found"});
    }

    res.status(200).json({ success: true, data: updatedPost });
});

const deletePost = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const postId = req.params.postId;

    const deletedPost = await postService.deletePost({ postId, userId });

    if (!deletedPost) {
        return res.status(404).json({ success: false, message: "Post not found "});
    }

    res.status(200).json({ success: true, data: deletedPost });
});

const togglePostVote = catchAsync(async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;

    const postVote = await postService.togglePostVote({ postId, userId });

    if (!postVote) {
        return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: postVote });
});

export default {
  getAllPosts,
  getPostById,
  getPostsByUser,
  createPost,
  updatePost,
  deletePost,
  togglePostVote
};