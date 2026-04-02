import "../App.css";

import { useResults } from "../hooks/useResults.js";

import type { Pair } from "../types/participants.js";


type ResultsProps = {
  pairs?: Pair[];
};

export default function Results({ pairs = [] }: ResultsProps) {
  const {
    downloading,
    goBack,
    handleDownload
  } = useResults({ pairs });

  return (
    <div className="results page-card">
      <h1>Secret Santa Results</h1>

      {pairs.length === 0 ? (
        <div className="empty-state">
          <p>No pairs generated yet.</p>
          <button onClick={goBack}>Go Back</button>
        </div>
      ) : (
        <>
          <ul className="results-list">
            {pairs.map(({ giver, receiver }) => (
              <li key={giver.id} className="result-item">
                <span className="giver">{giver.name}</span>
                <span className="arrow">→</span>
                <span className="receiver">{receiver.name}</span>
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