import axios from "axios";
const API_BASE_URL = "https://api-graph.tests.grupoapok.com";

// Llamada a la API para obtener nodos
export const getNodeAPI = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/nodes`);
    return response.data;
};

// Llamada a la API para obtener nodos hijos
export const getChildNodesAPI = async (parentId) => {
    const response = await axios.get(
      `${API_BASE_URL}/api/nodes?parent=${parentId}`
    );
    return response.data.splice(0, 3);
};

// Llamada a la API para eliminar un nodo
export const deleteNodeAPI = async (nodeId) => {
    const response = await axios.delete(`${API_BASE_URL}/api/node/${nodeId}`);
    return response.data;
};

// Llamada a la API para crear un nodo
export const createNodeAPI = async (parentNode) => {
    const response = await axios.post(`${API_BASE_URL}/api/node`, parentNode);
    return response.data;
};

export const getLocaleAPI = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/locales`);
    return response.data;
};

export const getTranslationAPI = async (id, locale) => {
    let response = {};
    response = await axios.get(
      `${API_BASE_URL}/api/node/${id}?locale=${locale}`
    );
    return response.data;
};
