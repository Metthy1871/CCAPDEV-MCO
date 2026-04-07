import { User } from "../models/User.js";
import AppError from "../utils/appError.js";

const createUser = async ({username, email, password}) => {

    try {

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
        });

        return user;

    } catch (error) {
        throw error;
    }
}

const validateUserLogin = async (identifier, password) => {

    if (
        typeof identifier !== "string" ||
        identifier.trim().length === 0 ||
        typeof password !== "string" ||
        password.length === 0
    ) {
        throw new AppError("Email/username and password are required", 400);
    }

    const normalizedIdentifier = identifier.trim().toLowerCase();
    
    try {

        const user = await User.findOne({ 
            $or: [
                { email: normalizedIdentifier },
                { username: normalizedIdentifier }
            ]
        }).select('+password');

        if(!user) {
            return null;
        };

        // compare passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return null;
        }

        return user;
    } catch (error) {
        throw error;
    }   
}

export {
    createUser,
    validateUserLogin
};