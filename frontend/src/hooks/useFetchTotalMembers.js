import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchTotalMembers() {

    return useQuery({

        queryKey: ['forumStats'],

        queryFn: async () => {
            const { data } = await axios.get('http://localhost:3000/api/users/stats');
            return data.data; 
        },

        staleTime: 1000 * 60 * 5 
    });
}