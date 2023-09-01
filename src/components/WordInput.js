import React, { useRef } from 'react';
import "./WordInput.css";


export function WordInput({ active, numOfChar, answer, ...props }) {
    const size = 50;
    const bgColor = active === true ? "blue" : "grey";
    const styles = { width: `${size}px`, height: `${size}px` };
    console.log("answer", props);

    numOfChar = 5;
    const classes = "box"

    return (
        <div className={`user-word-container ${active === true ? "active" : ""}`}>
            {Array.from({ length: numOfChar }).map((_, index) => (
                <div key={index} className={classes} style={styles}></div>
            ))}
        </div>
    );
}

