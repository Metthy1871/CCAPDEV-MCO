import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import config from '../../config/env.js';

export function useEditProfile() {
    
    const queryClient = useQueryClient();

    return useMutation({
        
        mutationFn: async (profileData) => {
            
            const token = localStorage.getItem('token');

            const response = await axios.put(
                `${config.apiUrl}/api/users/profile`,
                profileData,
                { 
                    headers: { Authorization: `Bearer ${token}` } 
                }
            );

            return response.data;
        },

        onSuccess: () => {
            
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            
            console.log("Profile successfully updated!");
        },
        
        onError: (error) => {
            console.error("Failed to update profile:", error.response?.data?.message || error.message);
        }
    });
}