// src/components/Record/formSubmission.js
import { format } from "date-fns";

export const submitForm = async ({ text, image, audio, setText, setImage, setAudio, setIsLoading, setError }) => {
    setIsLoading(true);
    setError(null); // Clear any previous error

    const formData = new FormData();
    formData.append("uid", 123456789); // Ensure it's an integer or proper ID
    formData.append("text", text);

    // Format the timestamp to match the desired format
    const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    formData.append("timestamp", timestamp);

    // Handle file inputs only if they are provided
    if (image) {
        formData.append("file", image, image.name);
        formData.append("file_name", image.name);
    }
    if (audio) {
        formData.append("file", audio, audio.name);
        formData.append("file_name", audio.name);
    }

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/upload/`, {
            method: "POST",
            body: formData,
          });
          
        if (response.ok) {
            console.log("Data sent successfully!");
            // Clear form after submission
            setText("");
            setImage(null);
            setAudio(null);
        } else {
            const errorData = await response.json();
            console.error("Failed to send data:", errorData);
            setError("Failed to send data");
        }
    } catch (error) {
        console.error("Error:", error);
        setError("An error occurred during submission.");
    } finally {
        setIsLoading(false);
    }
};
