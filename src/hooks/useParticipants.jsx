import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { extractNamesFromExcel } from "../utils/ExcelParser";
import { removeParticipant, mergeUniqueParticipants } from "../utils/participantsHelpers";


export function useParticipants(data, setData) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const goBack = () => navigate("/");


    const handleInputChange = useCallback((value) => {
        setInput(value);
        if (error) setError("");
    }, [error]); 

    const handleAdd = useCallback((e) => {
        e.preventDefault();
        if (isLoading) return;
        const trimmed = input.trim();
    
        if (!trimmed) {
          return setError("Name cannot be empty.");
        }
    
        if (
          data.some(
            (n) => n.toLowerCase() === trimmed.toLowerCase()
          )
        ) {
          return setError("Participant already added");
        }
    
        setData((prev) => [...prev, trimmed]);
        setInput("");
        setError("");
      }, [input, data, setData]);



    const handleRemove = useCallback((name) => {
        if (isLoading) return;
        setData((prev) => removeParticipant(prev, name));
      }, [setData]);


      const handleClearAll = () => {
        setData([]);
      };


    const handleFileUpload = useCallback(async (e) => {
        if (isLoading) return;
        const file = e.target.files?.[0];
        if (!file) return;
        
        try {
          setError("");
          setIsLoading(true);
          
          const namesFromFile = await extractNamesFromExcel(file);
      
          setData((prev) => mergeUniqueParticipants(prev, namesFromFile));
          
        } catch (err) {
          setError(err.message);
        }
      
        e.target.value = "";
        setIsLoading(false);
      }, [setData]);
    

      return {
        goBack,
        input,
        error,
        isLoading,
        handleInputChange,
        handleAdd,
        handleRemove,
        handleClearAll,
        handleFileUpload
      };
}