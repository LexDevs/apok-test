// src/components/Node.js
import React, { useState } from 'react';

const Node = ({ node, onNodeClick }) => {
    const [language, setLanguage] = useState('en');  // Estado para almacenar el idioma seleccionado

    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
    };

    return (
        <div onClick={() => onNodeClick(node.id)}>
            <h3>{node.translations[language] || node.title}</h3>
            <button onClick={() => handleLanguageChange('en')}>English</button>
            <button onClick={() => handleLanguageChange('es')}>Español</button>
        </div>
    );
};

export default Node;
