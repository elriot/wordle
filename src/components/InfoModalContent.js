import { randomIcon, resetIcon, shareIcon } from "../utils/util";
import "./InfoModalContent.css"

export const InfoModalContent = () => {
    const buttonClass = "btn btn-light fw-bold fs-6";
    // const bgColor = "lighgrey"
    const buttonStyles = { cursor: "default", backgroundColor:"#eceaea" };
    return (
    <div className="container row text-xl fs-6">
        <div className="subject-container">
            <p className="subject-title fw-bold">⭐What is Wordle?</p>
            <p className="subject-detail">
                Wordle is a game where you guess the word of the day.        
            </p>
        </div>
        <div className="subject-container">
            <p className="subject-title fw-bold">⭐rools</p>
            <p className="subject-detail">
                1. The word is selected from commonly used 5-letter words.     
            </p>
            {/* <p className="subject-detail">
                2. The background colors represent the following:<br/>
                - Green: The correct alphabet is in the correct position.<br/>
                - Yellow: The alphabet is in the word but in the wrong position.<br/>
                - Grey: The alphabet is not in the word.
            </p> */}
            <p className="subject-detail">2. The background colors represent the following:</p>
            <p className="subject-detail">- <span className="fw-bold text-success">Green</span>: The correct alphabet is in the correct position.</p>
            <p className="subject-detail">- <span className="fw-bold text-warning">Yellow</span>: The alphabet is in the word but in the wrong position.</p>
            <p className="subject-detail">- <span className="fw-bold text-black-50">Grey:</span> The alphabet is not in the word.</p>
            
        </div>
        <div className="subject-container">
            <p className="subject-title fw-bold">⭐Buttons</p>
            <p className="subject-detail">
                <span className={buttonClass} style={buttonStyles}>{randomIcon()}</span>
                &nbsp; Change the word.
            </p>
            <p className="subject-detail">
                <span className={buttonClass} style={buttonStyles}>{shareIcon()}</span>
                &nbsp; Share this game to friends.
            </p>
            <p className="subject-detail">
                <span className={buttonClass} style={buttonStyles}>{resetIcon()}</span>
                &nbsp; Reset the wordboard.
            </p>
        </div>
    </div>
    );
}

