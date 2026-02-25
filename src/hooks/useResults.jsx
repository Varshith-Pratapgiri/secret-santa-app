import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { exportSecretSantaResults } from "../utils/exportSecretSanta";

export function useResults(pairs) {
    const navigate = useNavigate();
    const [downloading, setDownloading] = useState(false);
    const goBack = () => navigate("/enter-list");


    const handleDownload = useCallback(() => {
        if (pairs.length === 0 || downloading) return;
      
        try {
          setDownloading(true);
          exportSecretSantaResults(pairs);
        } catch (err) {
          console.log("Download failed:", err.message);
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