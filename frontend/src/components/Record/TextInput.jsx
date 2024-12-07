import React from "react";

const TextInput = ({ value, onChange, className }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.shiftKey) {
            // Allow new line when Shift + Enter is pressed
            return;
        }
        // Prevent form submission when Enter is pressed without Shift key
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
        }
    };

    return (
        <textarea
            className={className}
            placeholder="Enter your text here"
            rows="1"
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
            }}
        />
    );
};

export default TextInput;
