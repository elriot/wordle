import { useEffect, useRef, useState } from 'react';
import './App.css';
import KeyboardButton from './components/KeyboardButton'
import { WordInput } from './components/WordInput';


const WRONG = 0;
const CORRECT = 1;
const POSITION_WRONG = 2;

const checkAnswer = (answer, userInput) => {
    const result = Array.from({ length: answer.length }, () => -1);
    const ansCharMap = {};
    for (const char of answer) {
        if (ansCharMap[char] === undefined) {
            ansCharMap[char] = 1;
        } else {
            ansCharMap[char] = ansCharMap[char] + 1;
        }
    }
    // // 첫번째. 먼저 완전히 일치하는 요소들을 골라낸다
    for(let i = 0; i < answer.length; i++){
        if(answer[i] === userInput[i]){
            result[i] = CORRECT;
            ansCharMap[answer[i]]--;
        }
    }

    // // 두번째. POSITION_WRONG과 WRONG을 골라낸다
    for (let i = 0; i < userInput.length; i++) {
        if(result[i] !== -1) continue;
        // console.log(i, answer[i], userInput[i]);
        const currAnsChar = userInput[i];
        if (ansCharMap[currAnsChar] > 0) {
            result[i] = POSITION_WRONG;
            ansCharMap[currAnsChar]--;
        } else {
            result[i] = WRONG;
        }        
    }

    return result;
}

const isAlphabet = (value) => {
    return /^[a-zA-Z]+$/.test(value);
}
function App() {
    const answer = "fubao".toUpperCase();
    const charLength = 5;
    const [wordInputs, setWordInputs] = useState([WordInput]);
    const [userInputs, setUserInputs] = useState([]);
    const [results, setResults]= useState([]);
    const [currentInput, setCurrentInput] = useState("");
    

    const handleKeyPress = (event) => {
        // console.log(event.keyCode)
        if (event.key === "Enter") {
            if(currentInput.length !== answer.length)
                return;

            setUserInputs(userInputs=>userInputs.concat(currentInput));
            setCurrentInput("");
            setResults((prev)=>[...prev, checkAnswer(answer, currentInput)]);
            setWordInputs(prev=>prev.concat(WordInput));

            // const result = checkAnswer(answer, userInputs[0]);
            // console.log(result);            
            // return;
        } else if(event.key === "Backspace"){
            if(currentInput.length > 0){
                setCurrentInput(currentInput.slice(0,-1));
            }
        } else {
            if(event.key.length !== 1){
                console.log("특수키 입력한 것으로 함")
                return;
            }
            if(currentInput.length >= answer.length)
                return;
            if(!isAlphabet(event.key)) 
                return;
            const input = currentInput + (event.key).toUpperCase();
            setCurrentInput(input);
        }
    }
    const handleAddClick = () =>{
        if(wordInputs.length > 4) return;
        setWordInputs(wordInputs=>wordInputs.concat(WordInput));   
        setUserInputs(userInputs=>userInputs.concat(""));           
    }
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        focusRef.current.focus();
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [currentInput]);
    const focusRef = useRef();
    const handleContainerClick = () => {
        focusRef.current.focus();

    }
    return (
        <div className='app-container container' onClick={handleContainerClick}>
            {/* <div value={currentInput}>{currentInput}</div> */}
            {wordInputs.map((input, index) => (                
                <WordInput
                    userInput={index === wordInputs.length-1 ? currentInput : userInputs[index]}
                    res={results[index]}
                    key={index}
                    active={index === wordInputs.length-1}
                    answer={answer}
                />
            ))}
            {/* <KeyboardButton/> */}
            <div>
                <input type='text' style={{visibility:'visible'}} ref={focusRef} value={currentInput}/>
                <button onClick={handleAddClick}>Enter</button>
            </div>

        </div>               
    );
}

export default App;
