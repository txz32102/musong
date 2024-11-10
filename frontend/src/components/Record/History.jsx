import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all history records on component mount
  useEffect(() => {
    const fetchHistoryRecords = async () => {
      try {
        const response = await axios.get('http://localhost:8000/history');
        setRecords(response.data.records);
      } catch (err) {
        setError("Error fetching history records.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryRecords();
  }, []);

  // Function to handle file download
  const downloadFile = async (recordId) => {
    try {
      const response = await axios.get(`http://localhost:8000/history/user/${recordId}/file`, {
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
          {records.map((record) => (
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
