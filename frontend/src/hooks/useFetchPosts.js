import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchPosts() {

    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8000/posts');
            return response.data.reverse();
        }
    });
}