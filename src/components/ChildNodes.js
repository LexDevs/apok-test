import React, { useEffect, useState } from "react";
import {
  getChildNodesAPI,
  deleteNodeAPI,
  getTranslationAPI,
} from "../services/api"; 
import "../styles/ChildNodes.css";
import useCreateNode from "../hooks/useCreateNode";

const ChildNodes = ({ node, locale, handleDeleteNodeParent }) => {
  const [childNodes, setChildNodes] = useState([]);

  const [title, setTitle] = useState(node.title);

  const [open, setOpen] = useState(false);

  const { isLoading, handleCreateNode, data, error } = useCreateNode();

  useEffect(() => {
    if (data) {
      setChildNodes([...childNodes, data]);
    }
  }, [data]);

  useEffect(() => {
    // Llamada a la API para obtener los nodos hijos
    !childNodes.length &&
      open &&
      getChildNodesAPI(node.id)
        .then((data) => setChildNodes(data))
        .catch((error) => console.error("Error fetching child nodes:", error));
  }, [childNodes.length, node.id, open]);

  useEffect(() => {
    getTranslationAPI(node.id, locale)
      .then((data) => {
        const localeNode = data?.translation?.find((t) => t.locale === locale);
        if (localeNode) {
          setTitle(localeNode.title);
        } else {
          setTitle(node.title);
        }
      })
      .catch((error) => console.error("Error fetching locale:", error));
  }, [locale, node.id, node.title]);

  const handleDeleteNode = (id) => {
    // Llamada a la API para eliminar el nodo
    deleteNodeAPI(id)
      .then((data) => {
        console.log(childNodes);
        const newArray = childNodes.filter((child) => child.id !== data.id);
        setChildNodes([...newArray]);
      })
      .catch((error) => console.error("Error deleting node:", error));
  };

  return (
    <div className="button-container">
      <p className="node-title">{title}</p>
      <button
        className="button button-create"
        onClick={() => handleCreateNode(node.id)}
      >
        Create Node
      </button>
      <a className="text" href="#" onClick={() => setOpen(!open)}>
        {open ? "Ocultar Hijos" : "Ver Hijos"}
      </a>
      {!node.parent && <hr />}

      {node.parent && (
        <button
          className="button button-delete"
          onClick={() => handleDeleteNodeParent(node.id)}
        >
          Delete Node
        </button>
      )}
      {error && <p>{error}</p>}
      <ul class="form">
        {open &&
          !!childNodes.length &&
          childNodes.map((child) => (
            <li key={child.id}>
              <ChildNodes
                key={child.id}
                node={child}
                locale={locale}
                handleDeleteNodeParent={handleDeleteNode}
              />
            </li>
          ))}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default ChildNodes;