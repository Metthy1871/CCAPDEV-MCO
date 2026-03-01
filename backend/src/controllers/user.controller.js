import * as userService from "../services/user.service.js";

const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await userService.findUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ 
            message: "Server error", error: error.message 
        });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { displayName, bio, avatar } = req.body;

        const updatedUser = await userService.updateUserData(id, { displayName, bio, avatar });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Error updating profile", error: error.message 
        });
    }
}

/*const getUserPosts = async (req, res) => {
    try {
        const { username } = req.params;

        const posts = await userService.findUserPosts(username);

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ 
            message: "Error fetching user posts", error: error.message 
        });
    }
}*/

export {
    getUserProfile,
    updateUserProfile
};
//export getUserPosts