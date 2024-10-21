import React, { useState, useRef } from "react";

const UploadData = ({ inputValue, onUploadSuccess, setAudioUrl, setImageUrl }) => {
  const [recording, setRecording] = useState(false);
  const [recordedAudioFile, setRecordedAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const mediaRecorderRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.start();
        mediaRecorderRef.current.ondataavailable = (e) => {
          const audioData = e.data;
          const audioPreviewUrl = URL.createObjectURL(audioData);
          setAudioUrl(audioPreviewUrl); // Set audio URL in InputBar
          const audioFile = new File([audioData], "recorded-audio.mp3", { type: "audio/mp3" });
          setRecordedAudioFile(audioFile);
        };
        setRecording(true);
      })
      .catch(err => console.error("Error accessing audio devices: ", err));
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleImageUpload = (e) => {
    const selectedImageFile = e.target.files[0];
    if (selectedImageFile) {
      setImageFile(selectedImageFile);
      const imagePreviewUrl = URL.createObjectURL(selectedImageFile);
      setImageUrl(imagePreviewUrl); // Set image URL in InputBar
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('text', inputValue);
    if (recordedAudioFile) {
      formData.append('audio', recordedAudioFile);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch('http://localhost:8001/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log("Data uploaded successfully:", data);
      onUploadSuccess(); // Call the success callback with updated state
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div className="upload-data-container">
      <button className="record-btn" onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Record Audio'}
      </button>

      <input
        type="file"
        accept="image/*"
        className="image-upload"
        onChange={handleImageUpload}
      />

      <button className="upload-btn" onClick={handleUpload}>
        Upload Data
      </button>
    </div>
  );
};

export default UploadData;
