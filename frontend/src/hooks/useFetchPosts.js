import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchPosts(sortBy = 'recent') {

    return useQuery({

        queryKey: ['posts', sortBy],
        
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:3000/api/posts?sortBy=${sortBy}`);
            return data.data;
        }
    });
}