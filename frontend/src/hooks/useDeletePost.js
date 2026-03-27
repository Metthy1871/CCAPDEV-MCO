import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import config from '../../config/env.js';

export function useDeletePost() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (postId) => {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `${config.apiUrl}/api/posts/${postId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },

        onError: (error) => {
            alert(error.response?.data?.message || "Failed to delete post");
        }
    });
}