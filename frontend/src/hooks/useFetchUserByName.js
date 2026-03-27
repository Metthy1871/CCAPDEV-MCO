import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import config from '../../config/env.js';

export function useFetchUserByName(username) {

    return useQuery({
        
        queryKey: ['user', username],

        queryFn: async () => {
            const response = await axios.get(`${config.apiUrl}/api/users/${username}`);
            return response.data; 
        },

        enabled: !!username 
    });
}