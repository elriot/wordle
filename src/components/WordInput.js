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
export function WordInput({ active, answer, userInput, res, blink, ...props }) {
    const size = WORD_INPUT_SIZE;
    const styles = { width: `${size}px`, height: `${size}px`, backgroundColor: "white" };
    console.log(userInput, answer)
    return (
        <div className={`user-word-container ${active === true ? "active" : ""}`}>
            {Array.from({ length: answer.length }).map((_, index) => (
                <div
                    style={{
                        ...styles,
                        backgroundColor: res ? getBgColor(res[index]) : 'white'
                    }}
                    key={index}
                    className={`box ${active === true ? "active" : ""}  ${blink ? "blink" : ""}`}
                >
                    <span>{userInput[index]}</span>
                </div>
            ))}
        </div>
    );
}

