import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useDeletePost() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (postId) => {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `http://localhost:3000/api/posts/${postId}`,
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