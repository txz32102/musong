import React, { useState } from "react";
import { format } from "date-fns";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import AudioInput from "./AudioInput";
import "./InputBar.css";

const InputBar = () => {
    // State to hold input values
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("uid", 123456789); // Ensure it's an integer or proper ID
        formData.append("text", text);

        // Format the timestamp to match the desired format
        const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
        formData.append("timestamp", timestamp);

        // Handle file inputs
        if (image) {
            formData.append("file", image, image.name);
            formData.append("file_name", image.name);
        }
        if (audio) {
            formData.append("file", audio, audio.name);
            formData.append("file_name", audio.name);
        }

        // Log FormData contents
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await fetch("http://localhost:8000/upload/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Data sent successfully!");
            } else {
                const errorData = await response.json();
                console.error("Failed to send data:", errorData);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="InputBar-container">
            <TextInput value={text} onChange={(e) => setText(e.target.value)} className="TextInput" />
            <ImageInput onChange={(e) => setImage(e)} className="ImageInput" />
            <AudioInput onChange={(e) => setAudio(e.target.files[0])} className="AudioInput" />
            <button onClick={handleSubmit}>Send</button>
        </div>
    );
};

export default InputBar;
