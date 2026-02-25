import "../App.css";

import { ParticipantItem } from "../components/EnterListItems";
import { useParticipants } from "../hooks/useParticipants";



export default function EnterList({ data, setData, handleGenerate }) {

  const {
    goBack,
    input, 
    error,
    isLoading,
    handleInputChange,
    handleAdd,
    handleRemove,
    handleClearAll,
    handleFileUpload
  } = useParticipants(data, setData);


  const canGenerate = data.length >= 2;



  return (
    <div className="page-card enter-list">
      <h1>Add Participants</h1>
     
      <form className="input-group" onSubmit={handleAdd}>
        <input
          type="text"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter name..."
          aria-label="Participant name"
          autoFocus
        />
        <button type="submit">Add</button>
      </form>

      <div className="file-upload">
  <label htmlFor="excelUpload" className="upload-label">
    {isLoading ? "uploading..." : "upload file"}
  </label>
  <input
    id="excelUpload"
    type="file"
    accept=".xlsx, .xls, .csv"
    onChange={handleFileUpload}
    disabled={isLoading}
  />
</div>

      {error && (
      <p id="input-error" role="alert" className="form-error">
        {error}
        </p>
      )}

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
          <ParticipantItem 
          key={name}
          name={name}
          onRemove={handleRemove}/>
        ))}
      </ul>
    
      <div className="action-buttons">
        <button type="button" onClick={goBack}>
          Back
        </button>

        <button
          type="button"
          disabled={!canGenerate}
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>
    </div>
  );
}