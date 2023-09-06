import { useRef, useState } from "react";
import { copyClipboardIcon } from "../utils/util";
import "./ShareModalContent.css";

export const ShareModalContent = () => {
    const [msg, setMsg] = useState("");
    const textInput = useRef();

    const copyToClipboard = async () => {
        const input = textInput.current;
        input.select();
        try {
            document.execCommand('copy');
            setMsg('Copied to clipboard.');
        } catch (err) {
            setMsg('Failed to copy!');
        }
        // try {
        //     await navigator.clipboard.writeText(textInput.current.value);
        //     setMsg('Copied to clipboard.');
        // } catch (err) {
        //     setMsg('Failed to copy!');
        // }
    };


    return (
    <div className="share-modal-container">
        <div className="share-inner-container">
            <input className="url" type="text" ref={textInput} value="http://www.naver.com" readOnly />
            <button className="copy-button btn btn-light" onClick={copyToClipboard}>
                {copyClipboardIcon()}
            </button>
        </div>   
        <p className="copied-msg">{msg}</p>
        <div className="comment">
            <p>If you like this game,</p>
            <p>please press the button to copy the link and share it with your friends🎈</p>  
        </div>
    </div>
    );
}