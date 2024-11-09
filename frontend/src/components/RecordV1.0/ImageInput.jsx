import React, { useRef } from "react";
import SvgRender from "./SvgRenderer";

const ImageInput = ({ className }) => {
    const fileInputRef = useRef(null);

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Process the uploaded file (e.g., display it or pass it to another component)
            console.log("Uploaded file:", file);
        }
    };

    // Handle paste event to get image from clipboard
    const handlePaste = (event) => {
        const items = event.clipboardData.items;
        for (let item of items) {
            if (item.type.startsWith("image/")) {
                const file = item.getAsFile();
                if (file) {
                    // Process the pasted image file
                    console.log("Pasted file:", file);
                }
            }
        }
    };

    // Open the file input dialog when button is clicked
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <button
            onClick={handleButtonClick}
            onPaste={handlePaste}
            className={className}
            style={{ border: 'none', background: 'none', padding: 0 }}
        >
            <SvgRender
                filePath={require('./svg/image.svg').default}
                scale={0.3}
            />
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
        </button>
    );
};

export default ImageInput;
