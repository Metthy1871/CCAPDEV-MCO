import { User } from "../models/User.js";

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
    
    try {

        const user = await User.findOne({ 
            $or: [
                { email: identifier.toLowerCase() },
                { username: identifier.toLowerCase() }
            ]
        });

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