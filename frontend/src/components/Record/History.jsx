import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Fetch data from the backend
        axios.get("http://localhost:8000/history")
            .then(response => setHistory(response.data))
            .catch(error => console.error("Error fetching history data:", error));
    }, []);

    // Function to format the timestamp to a more readable date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();  // Adjust formatting as needed
    };

    return (
        <div className="history-container">
            {history.map((entry, index) => (
                <div key={index} className="history-entry">
                    {/* Display timestamp */}
                    {entry.timestamp && (
                        <div className="history-time">
                            <strong>Time: </strong>{formatDate(entry.timestamp)}
                        </div>
                    )}

                    {/* Display text content */}
                    {entry.text && <p>{entry.text}</p>}

                    {/* Display images if any */}
                    {entry.images && entry.images.map((image, idx) => (
                        <img key={idx} src={image} alt={`History Image ${idx}`} className="history-image" />
                    ))}

                    {/* Display files if any */}
                    {entry.files && entry.files.map((file, idx) => (
                        <div key={idx} className="history-file">
                            <a href={file} target="_blank" rel="noopener noreferrer">Download File {idx + 1}</a>
                        </div>
                    ))}

                    {/* Display audio if any */}
                    {entry.audio && entry.audio.map((audio, idx) => (
                        <div key={idx} className="history-audio">
                            <audio controls>
                                <source src={audio} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default History;
