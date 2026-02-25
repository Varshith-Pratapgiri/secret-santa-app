import "../App.css";

import { useResults } from "../hooks/useResults";

export default function Results({ pairs }) {
  const {
    downloading,
    goBack,
    handleDownload
  } = useResults(pairs);

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