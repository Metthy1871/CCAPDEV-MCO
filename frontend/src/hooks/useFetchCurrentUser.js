import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchCurrentUser() {

    //Hardcoded until real login is built
    const username = "Guest"; 

    return useQuery({
        queryKey: ['currentUser', username],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8000/users?username=${username}`);
            return response.data[0];
        }
    });
}