import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import config from "../config/env.js";

const hasNonEmptyString = (value) =>
    typeof value === "string" && value.trim().length > 0;

const generateToken = (id, remember = false) => {
    const expiresIn = remember ? config.jwtRememberExpiresIn : config.jwtExpiresIn;

    return jwt.sign({ id, remember }, config.jwtSecret, {
        expiresIn,
    });
}

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation
        if (!username || !email || !password ) {
            return res.status(400).json({ message: "All fields must be filled"});
        }

        const user = await authService.createUser({username, email, password});

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

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: messages.join(', ') });
        }

        if (error.code === 11000){
            const field = Object.keys(error.keyValue)[0]; 
            return res.status(409).json({ message: `That ${field} is already taken.` });
        }

        console.error("🚨 REGISTRATION CRASH:", error);
        return res.status(500).json({ 
            message: "Internal server error"
        });
    }
}

const loginUser = async (req, res) => {
    try{

        // check if the user already exists and capture the rememberMe flag
        const { identifier, password, remember } = req.body;

        if (!hasNonEmptyString(identifier) || typeof password !== "string" || password.length === 0) {
            return res.status(400).json({ message: "Email/username and password are required" });
        }

        const user = await authService.validateUserLogin(identifier, password);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        // pass the token to the generator
        const token = generateToken(user._id, !!remember); 

        res.cookie("session", "active", {
            httpOnly: false,
            maxAge: remember
                ? 21 * 24 * 60 * 60 * 1000
                : 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "User Logged in",
            token,
            user: {
                id: user._id,
                username: user.username,
                avatar: user.avatar,
                bio: user.bio
            }
        });
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        return res.status(500).json({
            message: "Internal Server Error", error: error.message
        });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.cookie("session", "", {
            expires: new Date(0)
        });
        
        return res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
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