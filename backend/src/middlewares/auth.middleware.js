import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const protect = async (req, res, next) => {
    let token;

    // check for the token in the authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // attach the user to the request object, excluding the password
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User no longer exists" });
            }

            return next();
        } catch (error) {
            res.status(401).json({ 
                message: "Not authorized, invalid token", error: error.message 
            });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

export {
    protect
};