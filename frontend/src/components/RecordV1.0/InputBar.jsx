import React from "react";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import AudioInput from "./AudioInput";
import "./InputBar.css";

const InputBar = () => {
    return (
        <div className="InputBar-container">
            <TextInput className="TextInput"/>
            <ImageInput className="ImageInput"/>
            <AudioInput className="AudioInput"/>
        </div>
    );
};

export default InputBar;
