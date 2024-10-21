import React, { useState } from "react";
import SvgRender from "../../util/SvgRenderer";
import "./InputBar.css";

const InputBar = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCancelClick = () => {
    console.log("sss");
    setInputValue(''); 
  };

  return (
    <div className="input-bar-container">
      <input
        type="text"
        placeholder="try something here"
        className="input-bar"
        value={inputValue}
        onChange={handleInputChange}
      />
      <SvgRender
        filePath={require('./svg/cancel.svg').default}
        scale={0.2}
        className="cancel-icon"
        onClick={handleCancelClick}
      />
    </div>
  );
};

export default InputBar;