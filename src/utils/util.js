import { BsShare } from "react-icons/bs";
import { RxReset } from "react-icons/rx";
import { LiaRandomSolid } from "react-icons/lia";
import { FaInfoCircle } from "react-icons/fa";
import {AiOutlineCopy} from "react-icons/ai";
import { POSITION_WRONG, WRONG, CORRECT, WORDS } from "./constants";
import { WordInput } from "../components/WordInput";


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
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === userInput[i]) {
            result[i] = CORRECT;
            ansCharMap[answer[i]]--;
        }
    }

    // // 두번째. POSITION_WRONG과 WRONG을 골라낸다
    for (let i = 0; i < userInput.length; i++) {
        if (result[i] !== -1) continue;
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

export const shareIcon = () => {
    return <BsShare />;
}

export const randomIcon = () => {
    return <LiaRandomSolid />
}

export const resetIcon = () => {
    return <RxReset />
}
export const infoIcon = () => {
    return <FaInfoCircle />
}
export const copyClipboardIcon = () => {
    return <AiOutlineCopy/>
}
export const getRandomWord = () =>{
    const randomIdx = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIdx];
}
