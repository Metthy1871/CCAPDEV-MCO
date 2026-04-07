import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import config from '../../config/env.js';

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await axios.post(`${config.apiUrl}/api/auth/logout`);
        },

        onSettled: () => {
            // always clear client auth state so users are not stuck logged in locally.
            localStorage.removeItem('token');
            queryClient.clear();
        },

        onError: (error) => {
            console.error('Logout request failed:', error.response?.data?.message || error.message);
        }
    });
}
