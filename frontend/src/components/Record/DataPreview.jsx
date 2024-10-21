import React from 'react';

const DataPreview = ({ audioUrl, imageUrl }) => {
  return (
    <div className="data-preview-container">
      {audioUrl && (
        <audio controls className="audio-preview">
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}

      {imageUrl && (
        <img src={imageUrl} alt="Uploaded Preview" className="image-preview" />
      )}
    </div>
  );
};

export default DataPreview;
