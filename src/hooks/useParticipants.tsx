import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { extractNamesFromExcel } from "../utils/ExcelParser";
import { mergeUniqueParticipants } from "../utils/participantsHelpers";

import type { Participant } from "./types/participants";


type UseParticipantsReturn = {
  goBack: () => void,
  input: string,
  error: string,
  isLoading: boolean,
  handleInputChange: (value: string) => void,
  handleAdd: (e: React.FormEvent<HTMLFormElement>) => void,
  handleRemove: (id: number) => void,
  handleClearAll: () => void,
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>,
}

type UseParticipantsProps = {
  data: Participant[];
  setData: React.Dispatch<React.SetStateAction<Participant[]>>;
}


export function useParticipants({ data, setData }: UseParticipantsProps): UseParticipantsReturn {
    const [input, setInput] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const goBack = () => navigate("/");

    const handleInputChange = useCallback((value: string) => {
        setInput(value);
        setError("");
    }, [error]); 

    const handleAdd = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading) return;
        const trimmed = input.trim();
    
        if (!trimmed) {
          return setError("Name cannot be empty.");
        }
    
        if (
          data.some(
            (n) => n?.name?.toLowerCase() === trimmed.toLowerCase()
          )
        ) {
          setError("Participant already added");
          return;
        }
    
        setData((prev) => [...prev, { id: Date.now(), name: trimmed }]);
        setInput("");
        setError("");
      }, [input, data, setData, isLoading]);



    const handleRemove = useCallback((id: number) => {
        if (isLoading) return;
        setData((prev) => prev.filter(p => p.id !== id));
      }, [setData, isLoading]);


      const handleClearAll = () => {
        setData([]);
      };


    const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if (isLoading) return;
        const file = e.target.files?.[0];
        if (!file) return;
        
        try {
          setError("");
          setIsLoading(true);
          
          const namesFromFile: string[] = await extractNamesFromExcel(file);
      
          setData((prev) => mergeUniqueParticipants(prev, namesFromFile));
          
        } catch (err) {
          console.error(err instanceof Error ? err.message : err);
        } finally {
          e.target.value = "";
          setIsLoading(false);
        }
      
      }, [setData, isLoading]);
    

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