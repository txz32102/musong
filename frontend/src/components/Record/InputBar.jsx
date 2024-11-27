import React, { useState } from "react";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import AudioInput from "./AudioInput";
import SendButton from "./SendButton";
import { submitForm } from "./formSubmission"; // Import the new function
import "./InputBar.css";

const InputBar = () => {
    // State to hold input values
    const [text, setText] = useState("");
    const [image, setImage] = useState(null); // Image can be null
    const [audio, setAudio] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div className="InputBar-container">
            <TextInput value={text} onChange={(e) => setText(e.target.value)} className="TextInput" />
            <ImageInput onChange={(file) => setImage(file)} className="ImageInput" />
            <AudioInput onChange={(file) => setAudio(file)} className="AudioInput" />
            <SendButton 
                text={text}
                image={image}
                audio={audio}
                setText={setText}
                setImage={setImage}
                setAudio={setAudio}
                setIsLoading={setIsLoading}
                setError={setError}
                submitForm={submitForm} // Pass submitForm function
                isLoading={isLoading}
                disabled={isLoading} // Disable the icon when submitting
                className="send-button" 
            />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default InputBar;
