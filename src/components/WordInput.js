import React, { useRef } from 'react';
import "./WordInput.css";
const WRONG = 0;
const CORRECT = 1;
const POSITION_WRONG = 2;

const getBgColor = (code) => {
    if (code === CORRECT) {
        return "green";
    } else if (code === POSITION_WRONG) {
        return "yellow";
    } else {
        return "grey";
    }

}
export function WordInput({ active, answer, userInput, res, ...props }) {
    // res: [0, 0, 2, 0, 1] 

    const size = 50;

    console.log("size", size);
    const bgColor = active === true ? "blue" : "grey";
    
    // const styles = { width: `${size}px`, height: `${size}px`, backgroundColor: "white" };    
    const styles = { width: `${size}px`, height: `${size}px`, backgroundColor: "white" };    
    const classes = "box"

    return (
        <div className={`user-word-container ${active === true ? "active" : ""}`}>
            {Array.from({ length: answer.length }).map((_, index) => (
                <div
                    style={{
                        ...styles,
                        backgroundColor: res ? getBgColor(res[index]) : 'white'
                    }}
                    // style={{...styles, backgroundColor: getBgColor(res[index])}}
                    key={index}
                    className={classes}
                >
                    {userInput[index]}
                </div>
            ))}
        </div>
    );
}

