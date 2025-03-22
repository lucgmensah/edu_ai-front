import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { useStore } from '../store/useStore';

// URL de base
const baseUrl = 'http://localhost:8000/';

// Création d'une instance Axios
const WebClient: AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Fonction pour récupérer le token depuis le store
const getToken = () => {
    const state = useStore.getState();
    return state.token;
};

// Intercepteur pour ajouter les en-têtes à chaque requête
WebClient.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        const token = getToken();
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

export default WebClient;