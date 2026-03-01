import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "30d",
    });
}

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation
        if (!username || !email || !password ) {
            return res.status(400).json({ message: "All fields must be filled"});
        }

        const user = await authService.createUser(req.body);

        if (!user) {
            return res.status(400).json({ message: "Invalid user data" });
        }

        return res.status(201).json({
            message: "User registered",
            token: generateToken(user._id),
            user: { id: user._id, 
                    username: user.username,
                    avatar: user.avatar,
                    bio: user.bio
            }
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error", error: error.message
        });
    }
}

const loginUser = async (req, res) => {
    try{

        // check if the user already exists
        const { email, password } = req.body;

        const user = await authService.validateUserLogin(email, password);

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({
            message: "User Logged in",
            token: generateToken(user._id),
            user: {
                id: user._id,
                username: user.username,
                avatar: user.avatar,
                bio: user.bio
            }
        });
    }catch (error){
        return res.status(500).json({
            message: "Internal Server Error", error: error.message
        });
    }
}

const logoutUser = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Logout successful"
        });
    }catch (error) {
        return res.status(500).json({
            message: "Internal Server Error", error: error.message 
        });
    }
} 

const getMe = async (req, res ) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error", error: error.message 
        });
    }
};

export {
    registerUser,
    loginUser,
    logoutUser,
    getMe
};