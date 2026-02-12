import "../App.css";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { useState, useCallback } from "react";

export default function Results({ pairs }) {
  const navigate = useNavigate();
  const hasPairs = pairs?.length > 0;
  const [downloading, setDownloading] = useState(false);

  const goBack = () => navigate("/enter-list");

  const handleDownload = useCallback(() => {
  if (!hasPairs || downloading) return;

  try {
    setDownloading(true);

    const worksheetData = [
      ["Giver", "Receiver"],
      ...pairs.map(({ giver, receiver }) => [giver, receiver]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Secret Santa");

    const date = new Date().toISOString().split("T")[0];
    XLSX.writeFile(workbook, `Secret-Santa-Results-${date}.xlsx`);
  } catch (err) {
    console.error("Download failed:", err);
  } finally {
    setDownloading(false);
  }
}, [pairs, hasPairs, downloading]);

  return (
    <div className="results page-card">
      <h1>Secret Santa Results</h1>

      {!hasPairs ? (
        <div className="empty-state">
          <p>No pairs generated yet.</p>
          <button onClick={goBack}>Go Back</button>
        </div>
      ) : (
        <>
          <ul className="results-list">
            {pairs.map(({ giver, receiver }, index) => (
              <li key={index} className="result-item">
                <span className="giver">{giver}</span>
                <span className="arrow">→</span>
                <span className="receiver">{receiver}</span>
              </li>
            ))}
          </ul>

          <div className="action-buttons">
            <button onClick={goBack}>Back</button>
            <button onClick={handleDownload} disabled={downloading} aria-busy={downloading}>
                {downloading ? "Downloading..." : "Download"}
                </button>
          </div>
        </>
      )}
    </div>
  );
}