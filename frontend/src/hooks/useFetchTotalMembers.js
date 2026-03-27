import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import config from '../../config/env.js';

export function useFetchTotalMembers() {

    return useQuery({

        queryKey: ['forumStats'],

        queryFn: async () => {
            const { data } = await axios.get(`${config.apiUrl}/api/users/stats`);
            return data.data; 
        },

        staleTime: 1000 * 60 * 5 
    });
}