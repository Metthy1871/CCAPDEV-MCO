import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";

const generateToken = (id, remember = false) => {
    // If rememberMe is true, set expiration to 3 weeks, otherwise default to 24 hours
    const expiration = remember ? "21d" : "24h"; 
    return jwt.sign({ id, remember }, process.env.JWT_SECRET, {
        expiresIn: expiration,
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

        if (error.code === 11000){
            const field = Object.keys(error.keyValue)[0]; 
            return res.status(409).json({ message: `That ${field} is already taken.` });
        }

        return res.status(500).json({ 
            message: "Internal server error", error: error.message
        });
    }
}

const loginUser = async (req, res) => {
    try{

        // check if the user already exists and capture the rememberMe flag
        const { identifier, password, remember } = req.body;

        const user = await authService.validateUserLogin(identifier, password);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        // pass the token to the generator
        const token = generateToken(user._id, !!remember); 

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