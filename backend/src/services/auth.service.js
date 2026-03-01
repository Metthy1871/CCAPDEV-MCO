import { User } from "../models/User.js";

const createUser = async (userData) => {
    const { username, email, password } = userData;

    // check if the user already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if(existing) {
        throw new Error("user already exists");
    }

    // create the user
    
    const user = await User.create({
        username,
        email: email.toLowerCase(),
        password,
    });

    return user;
}

const validateUserLogin = async (email, password) => {
    const user = await User.findOne({ email: email.toLowerCase() });

    if(!user) return res.status(400).json({
        message: "User not found"
    });

    // compare passwords
    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
        throw new Error("Invalid credentials");
    }

    return user;
}

export {
    createUser,
    validateUserLogin
};