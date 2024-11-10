import React, { useState, useEffect } from 'react';

const ViewDebug = () => {
  // State to track the current time for debugging
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Use effect to update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

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
      <h2>Debug Information</h2>
      <div>
        <p><strong>Current Time:</strong> {time}</p>
      </div>
      <div>
        <p><strong>Some Debug State:</strong> Debugging is active!</p>
      </div>
      {/* You can add more debug information here */}
    </div>
  );
};

export default ViewDebug;
