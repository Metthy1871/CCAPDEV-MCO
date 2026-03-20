import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useCommentVote() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ commentId, action }) => {

            const token = localStorage.getItem('token'); 
            
            const response = await axios.put(
                `http://localhost:3000/api/comments/${commentId}/vote`, 
                { action },
                {
                    headers: {
                        Authorization: `Bearer ${token}` 
                    }
                }
            );
            return response.data.data;
        },

       onSuccess: (updatedComment) => {
            queryClient.invalidateQueries({ queryKey: ['comments'] });
        },

        onError: (error) => {
            console.error("Failed to register vote:", error.response?.data?.message || error.message);
        }
    });
}