import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchPostHistory(userId) {

    return useQuery({

        queryKey: ['posts', 'user', userId],

        queryFn: async () => {
            const response = await axios.get(`http://localhost:3000/api/posts/user/${userId}`);
            return response.data.data.reverse(); 
        },

        enabled: !!userId
    });
}