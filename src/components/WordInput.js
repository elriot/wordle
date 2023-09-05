import "./WordInput.css";
import {WRONG, CORRECT, POSITION_WRONG, WORD_INPUT_SIZE} from "../utils/constants.js" 

const getBgColor = (code) => {
    if (code === CORRECT) {
        return "green";
    } else if (code === POSITION_WRONG) {
        return "yellow";
    } else {//if (code===WRONG){
        return "grey";
    }

}
export function WordInput({ active, answer, userInput, res, ...props }) {
    const size = WORD_INPUT_SIZE;
    const bgColor = active === true ? "blue" : "grey";
    const styles = { width: `${size}px`, height: `${size}px`, backgroundColor: "white" };    
    const classes = active ? "box active" : "box";

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
                    <span>{userInput[index]}</span>
                </div>
            ))}
        </div>
    );
}

