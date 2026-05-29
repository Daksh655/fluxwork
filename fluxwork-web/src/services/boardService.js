import api from './api';

export const getAllBoards = async () => {
    try {
        const response = await api.get('/api/boards');

        // If it's empty or missing, return an empty array [] to prevent crashes
        return response.data.data || [];

    } catch (error) {
        console.error("Error fetching boards:", error);
        throw error;
    }
};