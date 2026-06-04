import api from './api'; // Use the secure interceptor instance

// to fetch all tasks
export const getAllTasks = async () => {
    try {
        const response = await api.get('/api/tasks');


        // response.data is the Axios response
        // response.data.data is your Spring Boot ApiResponse wrapper
        return response.data.data || [];

    } catch (error) {
        console.error("Error in taskService.getAllTasks:", error);
        throw error;
    }
};

// to submit a new task
export const createTask = async (taskPayload) => {
    try {
        const response = await api.post('/api/tasks', taskPayload);
        return response.data.data;
    } catch (error) {
        console.error("Error in taskService.createTask:", error);
        throw error;
    }
};