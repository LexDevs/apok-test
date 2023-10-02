import React, { useState, useEffect } from 'react';
import ChildNode from './ChildNodes';
import { getNodeAPI } from '../services/API';  // Archivo para llamar a la API

const ParentNodes = () => {
    const [parentNode, setParentNode] = useState([]);

    useEffect(() => {
        // Llamada a la API para obtener los nodos padres
        getNodeAPI()
            .then(data => setParentNode(data))
            .catch(error => console.error('Error fetching nodes:', error));
    }, []);

    return (
        <div>
            {parentNode.map(parent => (
                <ChildNode key={parent.id} node={parent} />
            ))}
        </div>
    );
};

export default ParentNodes;
