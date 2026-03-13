import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchPostHistory(username) {

    return useQuery({
        queryKey: ['posts', 'user', username],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8000/posts?user=${username}`);
            return response.data; 
        },

        enabled: !!username
    });
}