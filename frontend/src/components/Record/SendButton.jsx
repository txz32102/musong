// SendButton.js
import React from "react";
import SvgRender from "./SvgRenderer";  // Assuming you have SvgRenderer to render SVG files

const SendButton = ({ text, image, audio, setText, setImage, setAudio, setIsLoading, setError, submitForm, isLoading, disabled, className }) => {
    const handleSubmit = () => {
        submitForm({ text, image, audio, setText, setImage, setAudio, setIsLoading, setError });
    };

    return (
        <div className={`send-icon-container ${className}`} onClick={handleSubmit} style={{ cursor: 'pointer' }} disabled={disabled}>
            <SvgRender
                filePath={require('./svg/enter.svg').default} // Path to your SVG file
                scale={0.5} // You can adjust the scale
                className={`send-icon ${disabled ? 'disabled' : ''}`} // Optional: Add a class if disabled
            />
        </div>
    );
};

export default SendButton;
