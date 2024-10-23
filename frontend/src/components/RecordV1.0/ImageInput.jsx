import React from "react";
import SvgRender from "./SvgRenderer";

const ImageInput = ({className}) => {
    return(
        <div>
            <SvgRender
                filePath={require('./svg/image.svg').default}
                scale={0.3}
                className={className}
            />
        </div>
    )
}

export default ImageInput;