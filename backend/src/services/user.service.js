import { User } from "../models/User.js";

const findUserByUsername = async (username) => {
     // Find user by username and exclude the password from the results
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
        throw new Error("User not found");
    }

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

export {
    findUserByUsername,
    updateUserData,
};
