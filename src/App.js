import { useEffect, useRef, useState } from 'react';
import './App.css';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
import { WordInput } from './components/WordInput';


const WRONG = 0;
const CORRECT = 1;
const POSITION_WRONG = 2;

const checkAnswer = (answer, userInput) => {
    const result = [];
    const ansCharMap = {};
    for (const char of answer) {
        if (ansCharMap[char] === undefined) {
            ansCharMap[char] = 1;
        } else {
            ansCharMap[char] = ansCharMap[char] + 1;
        }
    }

    for (let i = 0; i < userInput.length; i++) {
        const currAnsChar = answer[i];
        const currUserChar = userInput[i];
        console.log(i, currAnsChar, currUserChar);
        if (currAnsChar === currUserChar) {
            result.push(CORRECT);
        } else {
            if (ansCharMap[currUserChar] > 0) {
                result.push(POSITION_WRONG);
                ansCharMap[currUserChar]--;
            } else {
                result.push(WRONG);
            }
        }
    }
    return result;
}
function App() {
    const answer = "fubao";
    const [wordInputs, setWordInputs] = useState([WordInput]);
    const [userInputs, setUserInputs] = useState([]);
    const [results, setResults]= useState([]);
    const lastInputRef = useRef(null);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            const result = checkAnswer(answer, "fubao");
            setResults(results=>results.concat(result));
            return;
        }
    }
    const handleAddClick = () =>{
        if(wordInputs.length > 4) return;
        setWordInputs(wordInputs=>wordInputs.concat(WordInput));   
        setUserInputs(userInputs=>userInputs.concat(""));           
    }
    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [wordInputs]);
    return (
        <div className='container row'>            
            {wordInputs.map((input, index) => (                
                <WordInput
                    answer={answer}
                    userInput={userInputs[index]}
                    result={results[index]}
                    key={index}
                    ref={index === wordInputs.length - 1 ? lastInputRef : null}
                    active={index === wordInputs.length-1}
                />
            ))}
            <button onClick={handleAddClick}>add</button>
        </div>
    );
}

export default App;
