import React from "react";
import SvgRender from "./SvgRenderer";

const AudioInput = ({className}) =>{
    return (    
        <div>
            <SvgRender
                filePath={require('./svg/audio.svg').default}
                scale={0.3}
                className={className}
            />
        </div>
    )
}

export default AudioInput;