import React, { useState } from 'react';
import { getChildNodesAPI, deleteNodeAPI, createNodeAPI } from '../services/API.js'; 
import '../styles/ChildNodes.css'

const ChildNodes = ({ node }) => {
    const [childNodes, setChildNodes] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en'); // Valor inicial: inglés

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const handleShowChildren = () => {
        // Llamada a la API para obtener los nodos hijos
        getChildNodesAPI(node.id)
            .then(data => setChildNodes(data))
            .catch(error => console.error('Error fetching child nodes:', error));
    };

    const handleCreateNode = () => {
        // Llamada a la API para crear un nuevo nodo
        createNodeAPI()
            .then(() => console.log('Node created successfully'))
            .catch(error => console.error('Error creating node:', error));
    };

    const handleDeleteNode = () => {
        // Llamada a la API para eliminar el nodo
        deleteNodeAPI(node.id)
            .then(() => console.log('Node deleted successfully'))
            .catch(error => console.error('Error deleting node:', error));
    };

    const getNodeTitle = () => {
        if (selectedLanguage === 'es') {
            return 'Título del Nodo';
        }
        // Por defecto, se mostrará en inglés
        return 'Node Title';
    };

    return (
        <div>
            <p className="node-title" onClick={handleShowChildren}>
                {getNodeTitle()}
            </p>
            <div className="button-container">
                <button className="button button-create" onClick={handleCreateNode}>
                    Create Node
                </button>
                <button className="button button-delete" onClick={handleDeleteNode}>
                    Delete Node
                </button>
                <button className="button button-es" onClick={() => handleLanguageChange('es')}>
                    Spanish
                </button>
                <button className="button button-en" onClick={() => handleLanguageChange('en')}>
                    English
                </button>
            </div>

            {childNodes.map((child) => (
                <ChildNodes key={child.id} node={child} />
            ))}
        </div>
    );
};

export default ChildNodes;
