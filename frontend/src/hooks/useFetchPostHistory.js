import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchPostHistory(userId, sortBy = 'recent') {

    return useQuery({

        queryKey: ['posts', 'user', userId, sortBy],

        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/api/posts/user/${userId}?sortBy=${sortBy}`);
            return data.data; 
        },

        enabled: !!userId
    });
}