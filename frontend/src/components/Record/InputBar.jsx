import React, { useState } from "react";
import SvgRender from "../../util/SvgRenderer";
import UploadData from "./UploadData"; // Import UploadData component
import DataPreview from "./DataPreview"; // Import DataPreview component
import "./InputBar.css";

const InputBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCancelClick = () => {
    setInputValue('');
    setShowUpload(false);
  };

  const handleUploadSuccess = (audio, image) => {
    setAudioUrl(audio);
    setImageUrl(image);
    setInputValue(''); // Clear input
    setShowUpload(false); // Hide upload data component
  };

  return (
    <div className="input-bar-container">
      <input
        type="text"
        placeholder="Enter your text here"
        className="input-bar"
        value={inputValue}
        onChange={handleInputChange}
      />

      <SvgRender
        filePath={require('./svg/cancel.svg').default}
        scale={0.2}
        className="cancel-icon"
        onClick={handleCancelClick}
      />

      <button onClick={() => setShowUpload(true)}>Upload Data</button>

      {showUpload && (
        <UploadData 
          inputValue={inputValue} 
          onUploadSuccess={handleUploadSuccess} 
          setAudioUrl={setAudioUrl} // Pass state setter to UploadData
          setImageUrl={setImageUrl} // Pass state setter to UploadData
        />
      )}

      {/* Data Preview Section */}
      <DataPreview audioUrl={audioUrl} imageUrl={imageUrl} />
    </div>
  );
};

export default InputBar;
