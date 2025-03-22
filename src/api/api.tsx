import WebClient from "./axios";

const api = {
    get: async (url: string) => {
        try {
            const response = await WebClient.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },

    post: async (url: string, data: any) => {
        try {
            const response = await WebClient.post(url, data);
            return response.data;
        } catch (error) {
            console.error("Error posting data:", error);
            throw error;
        }
    },

    put: async (url: string, data: any) => {
        try {
            const response = await WebClient.put(url, data);
            return response.data;
        } catch (error) {
            console.error("Error updating data:", error);
            throw error;
        }
    },

    delete: async (url: string) => {
        try {
            const response = await WebClient.delete(url);
            return response.data;
        } catch (error) {
            console.error("Error deleting data:", error);
            throw error;
        }
    }
};

export default api; // Export the API object