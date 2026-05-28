import api from "./api";

// Fetch all boards for the logged-in user
export const getAllBoards = async () => {
    const response = await api.get("/boards");
    // Your backend returns { status, message, data: [...] }
    // We only need the data array!
    return response.data.data;
};