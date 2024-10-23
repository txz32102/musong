import React from "react";

const TextInput = ({ className }) => {
    return (
            <textarea
                className={className}
                placeholder="Enter your text here"
                rows="1"
                onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
            />

    );
};

export default TextInput;


