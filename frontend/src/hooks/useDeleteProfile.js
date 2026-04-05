import { useMutation, useQueryClient } from '@tanstack/react-query';

import axios from 'axios';
import config from '../../config/env.js';

export function useDeleteProfile() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async () => {

            const token = localStorage.getItem('token');
            
            const { data } = await axios.delete(`${config.apiUrl}/api/users/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return data;
        },

        onSuccess: () => {
            
            localStorage.removeItem('token');
            queryClient.clear();
            window.location.href = '/'; 
        },

        onError: (error) => {
            console.error("Error deleting account:", error);
            alert("Something went wrong trying to delete your account. Please try again.");
        }
    });
}