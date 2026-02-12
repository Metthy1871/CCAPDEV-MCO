import { users } from "../data/users";

let current_user = users["Morgana"];

export const user_controller = {

    getCurrentUser() {

        return current_user;
    },

    getUserByName(username) {

        return users[username];
    },

    loginUser(username, password){

        const user = Object.values(users).find(u => 
        u.username.toLowerCase() === username.toLowerCase() || 
        u.handle.toLowerCase() === username.toLowerCase()
        );
        
        if (user) {
            current_user = user; // Update the session variable
            return true;
        }
        return false;
    },

    logoutUser(){
        current_user = null;
    }
}