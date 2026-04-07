import { User } from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import AppError from "../utils/appError.js";

const findUserByUsername = async (username) => {
     // Find user by username and exclude the password from the results
    const user = await User.findOne({ username }).select("-password").lean();

    if (!user) {
        throw new AppError('User not found', 404);
    }

    const postKarmaCalc = await Post.aggregate([
        { $match: { author: user._id } },
        { $project: { 
            score: { 
                $subtract: [
                    { $size: { $ifNull: ["$upvotes", []] } }, 
                    { $size: { $ifNull: ["$downvotes", []] } }
                ] 
            } 
        }},
        { $group: { _id: null, total: { $sum: "$score" } } }
    ]);

    const commentKarmaCalc = await Comment.aggregate([
        { $match: { author: user._id } },
        { $project: { 
            score: { 
                $subtract: [
                    { $size: { $ifNull: ["$upvotes", []] } }, 
                    { $size: { $ifNull: ["$downvotes", []] } }
                ] 
            } 
        }},
        { $group: { _id: null, total: { $sum: "$score" } } }
    ]);

    const postKarma = postKarmaCalc[0]?.total || 0;
    const commentKarma = commentKarmaCalc[0]?.total || 0;

    // Attach the calculated Karma score to the user object
    user.karma = postKarma + commentKarma;

    return user;
};

const updateUserData = async (id, updateFields) => {

    try {

        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true }
        ).select("-password"); // do not send the password back

        if (!updatedUser) {
            return null;
        }

        return updatedUser;

    } catch (error) {
        throw error;
    }

     
};

const deleteUserById = async (id) => {
    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return null;
        }

        return deletedUser;
    } catch (error) {
        throw error;
    }
}

export {
    findUserByUsername,
    updateUserData,
    deleteUserById
};
