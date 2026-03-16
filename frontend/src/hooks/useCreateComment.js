import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useCreateComment() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ postId, content, parentCommentId = null}) => {

            const token = localStorage.getItem('token');

            const response = await axios.post(
                `http://localhost:3000/api/posts/${postId}/comments`, 
                { 
                    post: postId,
                    content: content,
                    parentComment: parentCommentId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data;
        },

        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
        }
    });
}