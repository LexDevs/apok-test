import React, { useState } from 'react';
import { getChildNodesAPI, deleteNodeAPI, createNodeAPI } from '../services/Api';  // Archivo para llamar a la API
import '../styles/ChildNodes.css'

const ChildNodes = ({ node }) => {
    const [childNodes, setChildNodes] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('en'); // Valor inicial: inglés

    const [title, setTitle] = useState("");


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
        createNodeAPI({parent:node.id, title})
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
            <p onClick={handleShowChildren}>{getNodeTitle()}</p>
            <button onClick={handleLanguageChange.bind(null, 'en')}>English</button>
            <button onClick={handleLanguageChange.bind(null, 'es')}>Spanish</button>

            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/><button onClick={handleCreateNode}>Create Node</button>

            {node.parent&&<button onClick={handleDeleteNode}>Delete Node</button>}
        <ul>
            {childNodes.map(child => (
                <li><ChildNodes key={child.id} node={child} /></li>
            ))}
            </ul>
        </div>
    );
};

export default ChildNodes;
