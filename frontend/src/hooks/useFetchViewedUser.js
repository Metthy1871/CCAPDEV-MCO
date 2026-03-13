import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchViewedUser(username) {

    return useQuery({
        queryKey: ['user', username],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8000/users?username=${username}`);
            return response.data[0]; 
        },

        enabled: !!username
    });
}