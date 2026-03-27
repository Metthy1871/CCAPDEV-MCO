import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import config from '../../config/env.js';

export function useEditComment() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ postId, commentId, content }) => {

            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${config.apiUrl}/api/posts/${postId}/comments/${commentId}`,
                { content },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        },

        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
        },
        
        onError: (error) => {
            alert(error.response?.data?.message || "Failed to edit comment");
        }
    });
}