import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function usePostVote() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ postId, action }) => {

            const token = localStorage.getItem('token'); 
            
            const response = await axios.put(
                `http://localhost:3000/api/posts/${postId}/vote`, 
                { action },
                {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                }
            );
            return response.data.data;
        },

        onSuccess: (updatedPost) => {
            
            queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData) => {
                if (!oldData) return oldData;

                // Scenario A: It's an array of posts (Home Feed / Profile Feed)
                if (Array.isArray(oldData)) {
                    return oldData.map(post => 
                        post._id === updatedPost._id ? updatedPost : post
                    );
                }

                // Scenario B: It's a single post object (Post Detail Page)
                if (oldData._id === updatedPost._id) {
                    return updatedPost;
                }

                return oldData;
            });
        },

        onError: (error) => {
            console.error("Failed to register vote:", error.response?.data?.message || error.message);
        }
    });
}