import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useLogin() {
    
    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (credentials) => {
            
            const response = await axios.post(
                'http://localhost:3000/api/auth/login', 
                credentials
            );

            return response.data;
        },

        onSuccess: (data) => {
            
            const token = data.token || data.data?.token; 

            if (token) {

                localStorage.setItem('token', token);
                
                queryClient.invalidateQueries({ queryKey: ['currentUser'] });
                
                console.log("🔓 Access Granted. Welcome to the Phantom Forum.");
            }
        },

        onError: (error) => {
            console.error("Login failed:", error.response?.data?.message || error.message);
        }
    });
}