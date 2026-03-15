import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useFetchPostById(id) {

    return useQuery({

        queryKey: ['post', id],

        queryFn: async () => {
            const response = await axios.get(`http://localhost:8000/posts/${id}`);
            return response.data;
        },

        enabled: !!id
    });
}