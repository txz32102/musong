import {React, useState} from "react";
import InputBar from "./InputBar";

const Record = ({}) =>{
    console.log("this is a test");
    const [data, item] = useState("");
    return(
        <div>
            <p>this is a simple test</p>
            <InputBar/>
        </div>
    )
}

export default Record;