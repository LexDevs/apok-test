// src/components/NodeList.js
import React from 'react';
import Node from './Node';
import api from '../services/api';
import '../styles/NodeList.css'

const NodeList = ({ nodes, onNodeClick }) => {
    const handleCreateNode = async () => {
        try {
            // Lógica para crear un nodo
            const newNode = { id: Math.random(), title: 'New Node', parent: null };
            // Realizar la llamada al API para crear el nodo
            await api.post('/nodes', newNode);
        } catch (error) {
            console.error('Error creating node:', error);
        }
    };

    const handleDeleteNode = async (nodeId) => {
        try {
            // Verificar si el nodo tiene hijos
            const hasChildren = nodes.some(node => node.parent === nodeId);
            if (hasChildren) {
                alert('Cannot delete node with children.');
                return;
            }

            // Lógica para eliminar un nodo
            // Realizar la llamada al API para eliminar el nodo
            await api.delete(`/nodes/${nodeId}`);
        } catch (error) {
            console.error('Error deleting node:', error);
        }
    };

    return (
        <div className="nodeListContainer"> {/* Aplica la clase al contenedor principal */}
            <button className="createNodeButton" onClick={handleCreateNode}>Create Node</button>
            {nodes.map(node => (
                <div key={node.id} className="nodeContainer"> {/* Aplica la clase al contenedor del nodo */}
                    <div className="nodeTitle">{node.title}</div> {/* Aplica la clase al título del nodo */}
                    <Node node={node} onNodeClick={onNodeClick} />
                    <button className="deleteNodeButton" onClick={() => handleDeleteNode(node.id)}>Delete Node</button> {/* Aplica la clase al botón de eliminar nodo */}
                </div>
            ))}
        </div>
    );
};






export default NodeList;
