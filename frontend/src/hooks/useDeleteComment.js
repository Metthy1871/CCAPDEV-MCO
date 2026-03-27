import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import config from '../../config/env.js';

export function useDeleteComment() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({postId, commentId}) => {

            const token = localStorage.getItem('token');

            const response = await axios.delete(
                `${config.apiUrl}/api/posts/${postId}/comments/${commentId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            return response.data;
        },

        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
        },

        onError: (error) => {
            alert(error.response?.data?.message || "Failed to delete post");
        }
    });
}