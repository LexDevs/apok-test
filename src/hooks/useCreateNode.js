import { useState } from 'react'
import {
    createNodeAPI,
} from "../services/api";

const useCreateNode = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const handleCreateNode = (id) => {
        setIsLoading(true)
        createNodeAPI({ parent: id })
            .then((data) => {
                setData(data);
            })
            .catch((error) => setError("Error creating node:", error.message)) 
            .finally(()=>{
                setIsLoading(false)
            });
    };

    return {
        isLoading, handleCreateNode, data, error
    }
}

export default useCreateNode;