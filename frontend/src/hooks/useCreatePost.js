import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useCreatePost() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (newPost) => {

            const token = localStorage.getItem('token');

            const response = await axios.post(
                'http://localhost:3000/api/posts', 
                newPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries(['posts']);
        }
    });
}