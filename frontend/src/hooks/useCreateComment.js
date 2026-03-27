import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import config from '../../config/env.js';

export function useCreateComment() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ postId, content, parentCommentId = null}) => {

            const token = localStorage.getItem('token');

            const response = await axios.post(
                `${config.apiUrl}/api/posts/${postId}/comments`, 
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
            queryClient.invalidateQueries({ queryKey: ['comments', variables.postId] });
        }
    });
}