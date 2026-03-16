import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchCurrentUser() {

    return useQuery({

        queryKey: ['currentUser'],
        queryFn: async () => {

            const token = localStorage.getItem('token');

            if(!token)
                return null;

            const response = await axios.get(
                'http://localhost:3000/api/auth/me',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data;
        }
    });
}