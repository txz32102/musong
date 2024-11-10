import React from "react";
import ViewDebug from "./ViewDebug";
import InputBarV01 from "./InputBarV01"; // Importing the InputBar component
import InputBar from "./InputBar";
import History from "./History";

const Record = () => {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Main content */}
      <History />
      
      {/* Input Bar */}
      {/* <InputBarV01 /> */}
      <InputBar />
    </div>
  );
};

export default Record;
