import postService from '../services/post.service.js';
import catchAsync from '../utils/catchAsync.js';
import { sanitizeHTML } from '../utils/sanitize.js';

const hasNonEmptyString = (value) =>
    typeof value === 'string' && value.trim().length > 0;

const getKeywordFromQuery = (query) => {
    if (hasNonEmptyString(query.keyword)) return query.keyword.trim();
    if (hasNonEmptyString(query.search)) return query.search.trim();
    return '';
};


const getAllPosts = catchAsync(async (req, res) => {

    const { sortBy, tags } = req.query;
    const cleanKeyword = getKeywordFromQuery(req.query);

    // parse tags
    // if no tags param, default to empty array
    // normalize tags to lowercase
    let tagList = [];

    if (tags) {

        if (Array.isArray(tags)) 
            tagList = tags.map(t => t.trim().toLowerCase()).filter(Boolean);
        
        else if (typeof tags === 'string') 
            tagList = tags.split(",").map(t => t.trim().toLowerCase()).filter(Boolean);
    }

    // Trigger search if there is a keyword OR a tag!
    const isSearch = cleanKeyword.length > 0 || tagList.length > 0;

    const posts = isSearch 
        ? await postService.searchPosts({ keyword: cleanKeyword, tags: tagList, sortBy })
        : await postService.getAllPosts(sortBy);

    res.status(200).json({ success: true, data: posts });
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
    const { title, content, tags } = req.body;
    const safeContent = sanitizeHTML(content);

    const newPost = await postService.createPost({ title, content: safeContent, userId, tags });

    res.status(201).json({ success: true, data: newPost});

});

const updatePost = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const { title, content } = req.body;
    const postId = req.params.postId;

    const safeContent = sanitizeHTML(content);

    const updatedPost = await postService.updatePost({ postId, userId, title, content: safeContent });

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
    const action = req.body.action;

    const postVote = await postService.togglePostVote({ postId, userId, action });

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
  togglePostVote,
};