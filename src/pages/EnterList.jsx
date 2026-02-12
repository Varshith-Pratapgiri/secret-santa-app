import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import "../App.css";

import * as XLSX from "xlsx";

export default function EnterList({ data, setData, generateSecretSanta }) {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const normalizedData = useMemo(
    () => data.map((name) => name.toLowerCase()),
    [data]
  );

  const handleAdd = (e) => {
    e.preventDefault();

    const trimmed = input.trim();

    if (!trimmed) {
      return setError("Name cannot be empty.");
    }

    if (normalizedData.includes(trimmed.toLowerCase())) {
      return setError("Participant already added.");
    }

    setData((prev) => [...prev, trimmed]);
    setInput("");
    setError("");
  };

  const handleRemove = (name) => {
    setData((prev) => prev.filter((n) => n !== name));
  };

  const handleClearAll = () => {
    setData([]);
  };

  const handleGenerate = () => {
    if (data.length < 2) return;
    generateSecretSanta();
    navigate("/results");
  };

  const handleFileUpload = (e) => {
    setError("");

  const file = e.target.files[0];
  if (!file) return;

  if (!file.name.match(/\.(xlsx|xls)$/i)) {
  setError("Please upload a valid Excel file (.xlsx or .xls).");
  e.target.value = "";
  return;
}

  const reader = new FileReader();

  reader.onload = (evt) => {
  try {
    const fileData = new Uint8Array(evt.target.result);
    const workbook = XLSX.read(fileData, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const firstColumn = sheetData
      .slice(1)
      .map((row) => row[0])
      .filter((cell) => typeof cell === "string" && cell.trim() !== "")
      .map((name) => name.trim());

    if (firstColumn.length === 0) {
      setError("No valid names found in the Excel file.");
      return;
    }

    setData((prev) => {
      const existingLower = prev.map((n) => n.toLowerCase());
      const newNames = firstColumn.filter(
        (name) => !existingLower.includes(name.toLowerCase())
      );

      return [...prev, ...newNames];
    });

  } catch (err) {
    setError("Failed to read Excel file.");
  }
};

  reader.readAsArrayBuffer(file);
  e.target.value = "";
  };

  return (
    <div className="page-card enter-list">
      <h1>Add Participants</h1>

      {/* Input Section */}
      <form className="input-group" onSubmit={handleAdd}>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError("");
          }}
          placeholder="Enter name..."
          aria-label="Participant name"
          autoFocus
        />
        <button type="submit">Add</button>
      </form>

      <div className="file-upload">
  <label htmlFor="excelUpload" className="upload-label">
    Import from Excel
  </label>
  <input
    id="excelUpload"
    type="file"
    accept=".xlsx, .xls"
    onChange={handleFileUpload}
  />
</div>

      {error && <p className="form-error">{error}</p>}


      {data.length > 0 && (
        <div className="list-header">
          <p className="participant-count">
            {data.length} participant{data.length !== 1 && "s"}
          </p>

          <button
            type="button"
            className="clear-btn"
            onClick={handleClearAll}
          >
            Clear all
          </button>
        </div>
      )}

     
      <ul>
        {data.map((name) => (
          <li key={name} className="list-item">
            <span>{name}</span>
            <button
              type="button"
              className="remove-btn"
              onClick={() => handleRemove(name)}
              aria-label={`Remove ${name}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      
      <div className="action-buttons">
        <button type="button" onClick={() => navigate("/")}>
          Back
        </button>

        <button
          type="button"
          disabled={data.length < 2}
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>
    </div>
  );
}