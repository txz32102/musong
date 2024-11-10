import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
const [records, setRecords] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const apiUrl = process.env.REACT_APP_API_URL;  // Define the URL variable
console.log("API URL:", apiUrl);  // Log the URL to the console

// Fetch all history records on component mount
useEffect(() => {
const fetchHistoryRecords = async () => {
try {
console.log("try sentence")
const response = await axios.get(${apiUrl}/history);
console.log(response);
// Sort records by timestamp in descending order (new to old)
const sortedRecords = response.data.records.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
setRecords(sortedRecords);
} catch (err) {
setError("Error fetching history records.");
} finally {
setLoading(false);
}
};

fetchHistoryRecords();
}, [apiUrl]);  // Depend on apiUrl to re-run the effect if it changes

// Function to handle file download
const downloadFile = async (recordId) => {
try {
const response = await axios.get(${apiUrl}/history/user/${recordId}/file, {
responseType: 'blob', // Handle binary data
});

  // Create a Blob from the response data
  const fileBlob = response.data;

  // Create an anchor element to simulate a download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(fileBlob);  // Create a URL for the Blob
  const filename = response.headers['content-disposition']?.split('filename=')[1] || 'downloaded_file';
  link.download = filename;  // Extract filename from response headers
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);  // Remove the link element after clicking
} catch (error) {
  console.error("Error downloading file:", error);
  setError("Error downloading the file.");
}
};

if (loading) {
return <div>Loading...</div>;
}

if (error) {
return <div>{error}</div>;
}

return (
<div>
<h2>All History Records</h2>
{records.length === 0 ? (
<p>No records found.</p>
) : (
<ul>
{records.slice(0, 40).map((record) => (  // Limit to the first 40 records
<li key={record.id}>
<div>
<p><strong>Timestamp:</strong> {new Date(record.timestamp).toLocaleString()}</p>
<p><strong>Text:</strong> {record.text || 'No text provided'}</p>
<button onClick={() => downloadFile(record.id)}>Download File</button>
</div>
</li>
))}
</ul>
)}
</div>
);

};

export default History;

import React from "react";
import Inputbar from "./InputBar";
import History from "./History";

const Record = () => {
return (
<div>
<Inputbar />
<History />
</div>
);
};

export default Record;

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
.InputBar-container {
background-color: rgb(255, 249, 249);
position: fixed;
bottom: 0;
width: 100%;
max-width: 600px;
left: 50%;
transform: translateX(-50%);
padding: 10px;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
border-radius: 24px;
display: flex;
align-items: center;
box-sizing: border-box;
z-index: 1000;  /* Ensure it stays on top */
}

.TextInput {
background-color: rgb(255, 249, 249);
flex-grow: 1;
border: none;
outline: none;
border-radius: 4px;
padding: 10px;
font-size: 16px;
resize: none;
width: 100%;
box-sizing: border-box;
max-height: 100px;
overflow-y: auto;
}

.ImageInput, .AudioInput {
cursor: pointer;
width: 30px;
height: 30px;
margin-left: 10px; /* Add space between buttons */
}

@media (max-width: 600px) {
.InputBar-container {
padding: 8px;
max-width: 100%; /* Make sure it takes up the full width on smaller screens */
}

.TextInput {
    font-size: 14px;
    max-height: 80px; /* Adjust the height of the input box for small screens */
}

.ImageInput, .AudioInput {
    width: 28px;
    height: 28px;
}
}

@media (min-width: 600px) {
.InputBar-container {
max-width: 600px;
padding: 15px;
}

.TextInput {
    font-size: 16px;
    max-height: 120px; /* Adjust the height for larger screens */
}
}

i want the input bar always on the middle button of the whole screen, and it should always on my screen no matter how i scroll it, what css should i change or add?