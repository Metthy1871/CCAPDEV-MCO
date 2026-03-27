import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import config from '../../config/env.js';

export function useFetchPostHistory(userId, sortBy = 'recent') {

    return useQuery({

        queryKey: ['posts', 'user', userId, sortBy],

        queryFn: async () => {
            const { data } = await axios.get(`${config.apiUrl}/api/posts/user/${userId}?sortBy=${sortBy}`);
            return data.data; 
        },

        enabled: !!userId
    });
}