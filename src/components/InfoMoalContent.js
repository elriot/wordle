import { randomIcon, resetIcon, shareIcon } from "../utils/util";

export const InfoMoalContent = () => {
    const className = "container row text-xl fs-6";
    const buttonClass = "btn btn-light fw-bold fs-5";
    // const bgColor = "lighgrey"
    const buttonStyles = { cursor: "default", backgroundColor:"#eceaea" };
    return (<div className={className}>
        <p>
            <span className={buttonClass} style={buttonStyles}>{randomIcon()}</span>
            &nbsp; Change the word.
        </p>
        <p>
            <span className={buttonClass} style={buttonStyles}>{shareIcon()}</span>
            &nbsp; Share this game to friends.
        </p>
        <p>
            <span className={buttonClass} style={buttonStyles}>{resetIcon()}</span>
            &nbsp; Reset the wordboard.
        </p>
    </div>
    );
}

