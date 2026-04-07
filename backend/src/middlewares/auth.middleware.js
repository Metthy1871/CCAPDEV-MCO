import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import config from "../config/env.js";

const protect = async (req, res, next) => {
    let token;

    // check for the token in the authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            // verify the token
            const decoded = jwt.verify(token, config.jwtSecret);

            // attach the user to the request object, excluding the password
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User no longer exists" });
            }

            // check if the current token has the remember flag
            if (decoded.remember) {
                const newToken = jwt.sign(
                    { id: decoded.id, remember: true },
                    config.jwtSecret,
                    { expiresIn: config.jwtRememberExpiresIn }
                );
                // Attach the new token to the response header for the client to update
                res.setHeader("x-refreshed-token", newToken);
                res.setHeader("Access-Control-Expose-Headers", "x-refreshed-token"); 
            }

            return next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            }

            return res.status(401).json({ 
                message: "Not authorized, invalid token" 
            });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
};

export {
    protect
};