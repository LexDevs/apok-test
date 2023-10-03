import { useState } from 'react'
import {
    createNodeAPI,
} from "../services/api";

const useCreateNode = () => {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [dataDelete, setDeleteData] = useState(null);
    const [errorDelete, setDeleteError] = useState("");

    const handleCreateNode = (id) => {
        setIsDeleteLoading(true)
        createNodeAPI({ parent: id })
            .then((data) => {
                setDeleteData(data);
            })
            .catch((error) => setDeleteError("Error creating node:", error.message)) 
            .finally(()=>{
                setIsDeleteLoading(false)
            });
    };

    return {
        isDeleteLoading, handleCreateNode, dataDelete, errorDelete
    }
}

export default useCreateNode;