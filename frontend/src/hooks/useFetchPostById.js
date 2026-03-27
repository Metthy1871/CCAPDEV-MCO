import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import config from '../../config/env.js';

export function useFetchPostById(id) {

    return useQuery({

        queryKey: ['post', id],

        queryFn: async () => {
            const response = await axios.get(`${config.apiUrl}/api/posts/${id}`);
            return response.data.data;
        },

        enabled: !!id
    });
}