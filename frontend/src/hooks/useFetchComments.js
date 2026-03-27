import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import config from '../../config/env.js';

export function useFetchComments(postId) {

    return useQuery({

        queryKey: ['comments', postId],

        queryFn: async () => {
            const response = await axios.get(`${config.apiUrl}/api/posts/${postId}/comments`);
            
            return response.data.data; 
        },
        
        enabled: !!postId 
    });
}