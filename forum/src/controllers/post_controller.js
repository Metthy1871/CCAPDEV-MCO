import { sample_posts } from "../data/sample_posts";

export const post_controller = {

    getAllPosts()  {

        return sample_posts;
    },

    getPostsByUser(username) {

        return sample_posts.filter(p => p.user === username);
    },

    getPostById(id) {

        return sample_posts.find(p => p.id === Number(id));
    }
}