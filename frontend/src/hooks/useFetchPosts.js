import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchPosts(sortBy = 'recent', search) {

    return useQuery({

        queryKey: ['posts', sortBy, search],
        
        queryFn: async () => {
            let url = `http://localhost:3000/api/posts?sortBy=${sortBy}`;
            if (search && search.trim() !== '') {
                url += `&search=${search}`;
            }
            const { data } = await axios.get(url);
            return data.data;
        }
    });
}