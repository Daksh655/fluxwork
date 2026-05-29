import api from './api'; // 🔒 Use the secure interceptor instance

// FETCH ALL TASKS
export const getAllTasks = async () => {
    try {
        const response = await api.get('/api/tasks');


        // response.data is the Axios response
        // response.data.data is your Spring Boot ApiResponse wrapper
        // We fallback to an empty array [] if it's null to prevent UI crashes
        return response.data.data || [];

    } catch (error) {
        console.error("Error in taskService.getAllTasks:", error);
        throw error;
    }
};

// SUBMIT A NEW TASK
export const createTask = async (taskPayload) => {
    try {
        const response = await api.post('/api/tasks', taskPayload);
        return response.data.data;
    } catch (error) {
        console.error("Error in taskService.createTask:", error);
        throw error;
    }
};