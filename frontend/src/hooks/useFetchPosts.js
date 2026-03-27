import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import config from '../../config/env.js';

export function useFetchPosts(sortBy = 'recent', search) {

    return useQuery({

        queryKey: ['posts', sortBy, search],
        
        queryFn: async () => {
            let url = `${config.apiUrl}/api/posts?sortBy=${sortBy}`;
            if (search && search.trim() !== '') {
                url += `&search=${search}`;
            }
            const { data } = await axios.get(url);
            return data.data;
        }
    });
}