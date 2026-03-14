import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useCreatePost() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (newPostData) => {
            const response = await axios.post('http://localhost:8000/posts', newPostData);
            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });
}