import { useEffect, useRef, useState } from 'react';
import './App.css';
import { WordInput } from './components/WordInput';
import Header from './components/Header.js';
import Modal from './components/Modal';
import { isAlphabet, checkAnswer, getRandomWord, randomIcon } from './utils/util';
import { ShareModalContent } from './components/ShareModalContent';
import { InfoModalContent } from './components/InfoModalContent';
import { WORDS } from './utils/constants';

function App() {
    const [answer, setAnswer] = useState(WORDS[new Date().getDate()]);
    const [cleared, setCleared] = useState([]);
    const [wordInputs, setWordInputs] = useState([WordInput]);
    const [userInputs, setUserInputs] = useState([]);
    const [results, setResults] = useState([]);
    const [currentInput, setCurrentInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [warningVisible, setWarningVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [clearMsgVisible, setClearMsgVisible] = useState(false);
    const [blink, setBlink] = useState(false);
    // const inputRef = useRef();
    const scrollRef = useRef();
    const focusRef = useRef();

    useEffect(() => {        
        // focusRef.current.scrollIntoView({ behavior: 'smooth' });
        
        const uniqueArray = [...new Set(cleared)];
        if (uniqueArray.length !== cleared.length) {
            setCleared(uniqueArray);
        }
        window.addEventListener("keydown", handleKeyPress);
        if (!modalVisible)
            focusRef.current.focus();
        else
            focusRef.current.blur();

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [currentInput, modalVisible, cleared]);


    const submitAnswer = () => {    
        // inputRef.current.scrollIntoView({ behavior: 'smooth' });     
        if (currentInput.length !== answer.length)
            return;

        setUserInputs(userInputs => userInputs.concat(currentInput));
        setResults((prev) => [...prev, checkAnswer(answer, currentInput)]);
        if (currentInput === answer) {
            // window.scrollTo(0, document.body.scrollHeight+12000);   
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            const newArray = (prev) => [...prev, answer];
            setClearMsgVisible(true);
            setCleared(newArray);
            setBlink(true);          
              
            return;
        }
        setCurrentInput("");
        setWordInputs(prev => prev.concat(WordInput));
    }
    const handleKeyPress = (event) => {
        // inputRef.current.scrollIntoView({ behavior: 'smooth' }); 
        if (modalVisible || event.key === "F5") return;
        if (event.key === "Enter" || event.key === " ") {
            submitAnswer();
        } else if (event.key === "Backspace") {
            if (currentInput.length > 0) {
                setCurrentInput(currentInput.slice(0, -1));
            }
        } else {
            if (event.key.length !== 1 || !isAlphabet(event.key)) {
                setWarningVisible(true);
                return;
            }
            if (currentInput.length >= answer.length)
                return;

            const input = currentInput + (event.key).toUpperCase();
            setCurrentInput(input);
        }
        setWarningVisible(false);
    }
    const handleEnterClick = () => {
        submitAnswer();
    }


    const handleContainerClick = () => {
        if (!modalVisible)
            focusRef.current.focus();
    }
    const handleInputChange = () => {
        return; // prevent error , there's keyboardEvent for input action    
    }
    const clearBoard = () => {
        setWordInputs([WordInput]);
        setUserInputs([]);
        setResults([]);
        setCurrentInput("");        
        setClearMsgVisible(false);
        setBlink(false);
    }
    const handleHeaderClick = (func) => {
        if (func === "reset") {
            clearBoard();
        } else if (func === "share") { // func === "share"
            setModalContent(<ShareModalContent />);
            setModalVisible(true);
        } else if (func === "info") {
            // console.log("info");
            setModalContent(<InfoModalContent />);
            setModalVisible(true);
        } else if (func === "random") {
            clearBoard();
            if (cleared.length >= 31) {
                setCleared([]);
                setAnswer(getRandomWord());
            } else {
                const newArray = [...cleared, answer];
                while (true) {
                    const newWord = getRandomWord();
                    if (newArray.indexOf(newWord) === -1) {
                        setAnswer(newWord);
                        break;
                    }
                }
                setCleared(newArray);
            }
        }
    }
    const handleModalClose = () => {
        setModalVisible(false);
    }
    return (
        <div className='app-container' onClick={handleContainerClick}>
            <div className='header-container'>
                <Header onHeaderButtonClick={handleHeaderClick} />
            </div>
            <Modal isVisible={modalVisible} onClose={handleModalClose}>{modalContent}</Modal>
            <div className='word-container'>
                {wordInputs.map((input, index) => (
                    <WordInput
                        userInput={index === wordInputs.length - 1 ? currentInput : userInputs[index]}
                        res={results[index]}
                        key={index}
                        active={index === wordInputs.length - 1}
                        answer={answer}
                        blink={blink}
                    />
                ))}
            </div>

            <div className='input-container'>
                <input type='text' ref={focusRef} value={currentInput} onChange={handleInputChange} />
                <button className="btn " onClick={handleEnterClick}>Enter</button>
            </div>
            <div className="msg-container" ref={scrollRef}>
                {clearMsgVisible &&
                    <p className='cleared'>
                        You Wordle It!✨<br></br>
                        If you want to play more, Click Random {randomIcon()} button!
                    </p>
                }
                {warningVisible && !clearMsgVisible &&
                    <p className='warning'>
                        Only English characters are allowed.
                    </p>
                }
            </div>
        </div>
    );
}

export default App;

