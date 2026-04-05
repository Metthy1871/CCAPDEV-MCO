import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import config from '../../config/env.js';

export function useFetchPosts(sortBy = 'recent', keyword = '', tags = []) {

    return useQuery({

        queryKey: ['posts', sortBy, keyword, tags],
        
        queryFn: async () => {

            const params = new URLSearchParams();
            
            if (sortBy) params.append('sortBy', sortBy);
            if (keyword) params.append('keyword', keyword);
            
            // If they click multiple tags, this safely appends them all
            if (tags && tags.length > 0) {
                tags.forEach(tag => params.append('tags', tag));
            }

            const { data } = await axios.get(`${config.apiUrl}/api/posts?${params.toString()}`);
            return data.data;
        }
    });
}