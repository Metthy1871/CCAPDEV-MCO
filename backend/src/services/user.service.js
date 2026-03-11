import { User } from "../models/User.js";
// import { Post } from "../models/Post.js";

const findUserByUsername = async (username) => {
     // Find user by username and exclude the password from the results
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

const updateUserData = async (id, updateFields) => {
     const updatedUser = await User.findByIdAndUpdate(
        id,
        updateFields,
        { new: true, runValidators: true }
    ).select("-password"); // do not sent the password back

    if (!updatedUser) {
        throw new Error("User not found");
    }

    return updatedUser;
};

/* const findUserPosts = async (username) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error("User not found");
    }

    const posts = await Post.find({ author: user._id });
    
    return posts;
}; */

export {
    findUserByUsername,
    updateUserData,
};
// export findUserPosts