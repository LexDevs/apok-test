import React, { useState } from 'react';
import { getChildNodesAPI, deleteNodeAPI, createNodeAPI } from '../services/Api.js';
import '../styles/ChildNodes.css';

const ChildNodes = ({ node }) => {
    const [childNodes, setChildNodes] = useState([]);
    const [isChildrenVisible, setIsChildrenVisible] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const handleShowChildren = () => {
        getChildNodesAPI(node.id)
            .then(data => {
                setChildNodes(data);
                setIsChildrenVisible(true);
            })
            .catch(error => console.error('Error fetching child nodes:', error));
    };

    const handleCreateNode = () => {
        createNodeAPI()
            .then(() => console.log('Node created successfully'))
            .catch(error => console.error('Error creating node:', error));
    };

    const handleDeleteNode = () => {
        deleteNodeAPI(node.id)
            .then(() => console.log('Node deleted successfully'))
            .catch(error => console.error('Error deleting node:', error));
    };

    const getNodeTitle = () => {
        if (selectedLanguage === 'es') {
            return 'Título del Nodo';
        }
        return 'Node Title';
    };

    return (
        <div>
            <p className="node-title" onClick={handleShowChildren}>
                {getNodeTitle()}
            </p>
            {isChildrenVisible && (
                <div>
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
            )}
        </div>
    );
};

export default ChildNodes;
 