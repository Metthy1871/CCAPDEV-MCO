import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchComments(postId) {

    return useQuery({

        queryKey: ['comments', postId],

        queryFn: async () => {
            const response = await axios.get(`http://localhost:3000/api/posts/${postId}/comments`);
            
            return response.data.data; 
        },
        
        enabled: !!postId 
    });
}