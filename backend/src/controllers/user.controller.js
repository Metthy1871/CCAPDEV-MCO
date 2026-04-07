import * as userService from "../services/user.service.js";
import { User } from "../models/User.js";

const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await userService.findUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(500).json({ 
            message: "Server error", error: error.message 
        });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const id = req.user._id;
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

const getTotalMembers = async (req, res) => {

    try {
        const totalMembers = await User.countDocuments(); 
        
        res.status(200).json({ 
            success: true, 
            data: { totalMembers } 
        });
    } catch (error) {

        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch total members",
            error: error.message
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.user._id;

        const deletedUser = await userService.deleteUserById(id);

        if (!deletedUser){
            return res.status(404).json({ message: "User not found" });
        }

        res.cookie("session", "", {
            expires: new Date(0)
        });

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
}

export {
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getTotalMembers
};
