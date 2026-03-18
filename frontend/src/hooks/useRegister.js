import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useRegister() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (userData) => {
            const response = await axios.post(
                'http://localhost:3000/api/auth/register', 
                userData
            );

            return response.data;
        },

        onSuccess: (data) => {

            const token = data.token || data.data?.token; 

            if (token) {
                
                localStorage.setItem('token', token);
                
                queryClient.invalidateQueries({ queryKey: ['currentUser'] });
                
                console.log("📝 Registration successful. Welcome to the Phantom Forum.");
            }
        },

        onError: (error) => {
            console.error("Signup failed:", error.response?.data?.message || error.message);
        }
    });
}