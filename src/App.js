// src/App.js
import React, { useState, useEffect } from 'react';
import NodeList from './components/NodeList';
import api from './services/api';
import './styles/App.css'

const App = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    // Función para obtener los nodos iniciales
    const fetchInitialNodes = async () => {
      try {
        const response = await api.get('/nodes');
        setNodes(response.data);
      } catch (error) {
        console.error('Error fetching nodes:', error);
      }
    };

    fetchInitialNodes();
  }, []);

  const handleNodeClick = async (nodeId) => {

  };

  return (
    <div className="container">
      <div className="header">
        <h1>Node Tree Navigation</h1>
      </div>
      <NodeList nodes={nodes} onNodeClick={handleNodeClick} />
    </div>
  );
};

export default App;
