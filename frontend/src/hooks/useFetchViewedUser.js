import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchViewedUser(username) {

    return useQuery({

        queryKey: ['user', username],

        queryFn: async () => {
            const response = await axios.get(`http://localhost:3000/api/users/${username}`);
            return response.data; 
        },

        enabled: !!username
    });
}