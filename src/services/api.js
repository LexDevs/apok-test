import axios from 'axios';
const API_BASE_URL = 'https://api-graph.tests.grupoapok.com';

// Llamada a la API para obtener nodos
export const getNodeAPI = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/nodes`);
        return response.data;
    } catch (error) {
        console.error('Error fetching nodes:', error);
        throw error;
    }
};

// Llamada a la API para obtener nodos hijos
export const getChildNodesAPI = async (parentId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/nodes?parent=${parentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching child nodes:', error);
        throw error;
    }
};

// Llamada a la API para eliminar un nodo
export const deleteNodeAPI = async (nodeId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/nodes/${nodeId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting node:', error);
        throw error;
    }
};

// Llamada a la API para crear un nodo
export const createNodeAPI = async (parentNode) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/nodes`, parentNode);
        return response.data;
    } catch (error) {
        console.error('Error creating node:', error);
        throw error;
    }
};
