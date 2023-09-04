import { useEffect, useRef, useState } from 'react';
import './App.css';
import KeyboardButton from './components/KeyboardButton'
import { WordInput } from './components/WordInput';
import {WRONG, CORRECT, POSITION_WRONG, WORD_INPUT_SIZE} from './utils/constants.js'
import Header from './components/Header.js';



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
    const focusRef = useRef();
    
    const submitAnswer = () => {
        if(currentInput.length !== answer.length)
            return;
        
        
        setUserInputs(userInputs=>userInputs.concat(currentInput));
        setResults((prev)=>[...prev, checkAnswer(answer, currentInput)]);
        if(currentInput === answer){
            console.log("즈엉답입니다");
            return;
        }
        setCurrentInput("");
        setWordInputs(prev=>prev.concat(WordInput));
    }
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            submitAnswer();
            console.log(window)
            // window.scrollBy(0, WORD_INPUT_SIZE);
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
    const handleEnterClick = () =>{
        submitAnswer();     
    }
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        focusRef.current.focus();
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [currentInput]);
    
    const handleContainerClick = () => {
        focusRef.current.focus();

    }
    const handleInputChange = () => {
        return; // prevent error , there's keyboardEvent for input action    
    }
    const handleHeaderClick = (func) => {
        // console.log("func" , func);
        if(func === "reset"){
            setWordInputs([WordInput]);
            setUserInputs([]);
            setResults([]);
            setCurrentInput("")
        } else if(func === "share") { // func === "share"
            console.log("share ToFriend")
        } else if(func === "info"){
            console.log("info");
        }
    }
    return (
        <div className='app-container' onClick={handleContainerClick}>
            <div className='header-container'>
                <Header onHeaderButtonClick={handleHeaderClick}/>
            </div>
            <div className='word-container'>
                {wordInputs.map((input, index) => (                
                    <WordInput
                        userInput={index === wordInputs.length-1 ? currentInput : userInputs[index]}
                        res={results[index]}
                        key={index}
                        active={index === wordInputs.length-1}
                        answer={answer}
                    />
                ))}
            </div>
            <div className='input-container'>
                <input type='text'  ref={focusRef} value={currentInput} onChange={handleInputChange}/>
                <button onClick={handleEnterClick}>Enter</button>
            </div>

        </div>               
    );
}

export default App;
