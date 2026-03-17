import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useEditPost() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ postId, content }) => {

            const token = localStorage.getItem('token');
            const response = await axios.put(
                `http://localhost:3000/api/posts/${postId}`,
                { content },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        },

        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
        },
        
        onError: (error) => {
            alert(error.response?.data?.message || "Failed to edit post");
        }
    });
}