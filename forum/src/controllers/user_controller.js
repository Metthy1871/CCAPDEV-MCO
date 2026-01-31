import { users, current_user } from "../data/users";

export const user_controller = {

    getCurrentUser() {

        return current_user;
    },

    getUserByName(username) {

        return users[username];
    }
}