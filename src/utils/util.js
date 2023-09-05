
import { POSITION_WRONG, WRONG, CORRECT } from "./constants";
export const checkAnswer = (answer, userInput) => {
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

export const isAlphabet = (value) => {
    return /^[a-zA-Z]+$/.test(value);
}