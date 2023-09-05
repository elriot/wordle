import { useEffect, useRef, useState } from 'react';
import './App.css';
import { WordInput } from './components/WordInput';
import Header from './components/Header.js';
import Modal from './components/Modal';
import { isAlphabet, checkAnswer } from './utils/util';

function App() {
    const answer = "fubao".toUpperCase();
    const charLength = 5;
    const [wordInputs, setWordInputs] = useState([WordInput]);
    const [userInputs, setUserInputs] = useState([]);
    const [results, setResults]= useState([]);
    const [currentInput, setCurrentInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [warningVisible, setWarningVisible] = useState(false);
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
        setWarningVisible(false);
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
            if(!isAlphabet(event.key)){
                setWarningVisible(true);
                return;
            }
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
        if(func === "reset"){
            setWordInputs([WordInput]);
            setUserInputs([]);
            setResults([]);
            setCurrentInput("")
        } else if(func === "share") { // func === "share"
            console.log("share ToFriend")
        } else if(func === "info"){
            console.log("info");
            setModalVisible(true);
        }
    }
    const handleModalClose = () =>{
        setModalVisible(false);
    }
    return (
        <div className='app-container' onClick={handleContainerClick}>
            <div className='header-container'>
                <Header onHeaderButtonClick={handleHeaderClick}/>
            </div>
            <Modal isVisible={modalVisible} content="hahahahaha" onClose={handleModalClose}/>
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
            {warningVisible &&
                <p className='warning'>
                    Only English characters are allowed. 
                </p>
            }

        </div>               
    );
}

export default App;
