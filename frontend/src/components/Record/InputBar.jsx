// src/components/Record/InputBar.jsx
import React, { useState } from "react";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import AudioInput from "./AudioInput";
import { submitForm } from "./formSubmission"; // Import the new function
import "./InputBar.css";

const InputBar = () => {
    // State to hold input values
    const [text, setText] = useState("");
    const [image, setImage] = useState(null); // Image can be null
    const [audio, setAudio] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle form submission
    const handleSubmit = () => {
        submitForm({ text, image, audio, setText, setImage, setAudio, setIsLoading, setError });
    };

    return (
        <div className="InputBar-container">
            <TextInput value={text} onChange={(e) => setText(e.target.value)} className="TextInput" />
            <ImageInput onChange={(file) => setImage(file)} className="ImageInput" />
            <AudioInput onChange={(file) => setAudio(file)} className="AudioInput" />
            <button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Sending..." : "Send"}
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default InputBar;
