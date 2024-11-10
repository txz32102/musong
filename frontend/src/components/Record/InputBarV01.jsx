import React from "react";

const InputBarV01 = () => {
  return (
    <div
      style={{
        position: "fixed", // Fixes it to the bottom of the screen
        bottom: 0, // Ensures it's at the bottom of the screen
        left: "50%", // Centers it horizontally
        transform: "translateX(-50%)", // Centers it exactly
        width: "80%", // Makes it 80% of the screen width
        backgroundColor: "#ffffff", // Background color of the input bar
        padding: "10px", // Padding around the content
        borderTop: "1px solid #ccc", // Optional: Border for distinction
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow
        zIndex: 1000, // Ensures it's on top of other elements
      }}
    >
      <input
        type="text"
        placeholder="Type something..."
        style={{
          width: "100%", // Makes the input take up the full width
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default InputBarV01;
