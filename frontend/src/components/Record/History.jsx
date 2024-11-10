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
        const response = await axios.get(`${apiUrl}/history`);
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
      const response = await axios.get(`${apiUrl}/history/user/${recordId}/file`, {
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
    <div
      style={{
        width: '100%',  // Use 100% of the available screen width
        maxWidth: '100vw', // Ensure it doesn't exceed the viewport width
        height: '30000px',
        border: '1px solid black',
        overflow: 'auto',
        backgroundColor: '#f0f0f0',
      }}
    >
      <h2>All History Records</h2>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {records.slice(0, 400).map((record) => (  // Limit to the first 40 records
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
