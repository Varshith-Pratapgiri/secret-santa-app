import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { exportSecretSantaResults } from "../utils/exportSecretSanta";

import type { Pair } from "../types/participants"; 

type UseResultsProps = {
  pairs: Pair[];
}

type UseResultsReturn = {
  downloading: boolean;
  goBack: () => void;
  handleDownload: () => void;
}

export function useResults({ pairs }: UseResultsProps): UseResultsReturn {
    const navigate = useNavigate();
    const [downloading, setDownloading] = useState(false);
    const goBack = () => navigate("/enter-list");


    const handleDownload = useCallback(() => {
        if (pairs.length === 0 || downloading) return;
      
        try {
          setDownloading(true);
          exportSecretSantaResults(pairs);
        } catch (err) {
          console.error(err instanceof Error ? err.message : err);
        } finally {
          setDownloading(false);
        }
      }, [pairs, downloading]);

      return {
        downloading, 
        goBack, 
        handleDownload,
      }
}