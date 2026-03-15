import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useCreateComment() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ postId, updatedComments }) => {

            const response = await axios.patch(`http://localhost:8000/posts/${postId}`, {
                comments: updatedComments
            });

            return response.data;
        },

        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
        }
    });
}