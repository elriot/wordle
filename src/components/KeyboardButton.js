import "./KeyboardButton.css";
export default function Keyboard() {
    const handleKeyPress = (key) => {
        console.log("hey", key);
        const event = new KeyboardEvent("keydown", {
            bubbles: true,
            cancelable: true,
            key: key
        });

        window.dispatchEvent(event);
    }
    return (
        <div className="keyboard">
            <div className="keyboard-row">
                <button onClick={() => handleKeyPress('Q')}>Q</button>
                <button onClick={() => handleKeyPress('W')}>W</button>
                <button onClick={() => handleKeyPress('E')}>E</button>
                <button onClick={() => handleKeyPress('R')}>R</button>
                <button onClick={() => handleKeyPress('T')}>T</button>
                <button onClick={() => handleKeyPress('Y')}>Y</button>
                <button onClick={() => handleKeyPress('U')}>U</button>
                <button onClick={() => handleKeyPress('I')}>I</button>
                <button onClick={() => handleKeyPress('O')}>O</button>
                <button onClick={() => handleKeyPress('P')}>P</button>            
            </div>
            <div className="keyboard-row row">
                <button onClick={() => handleKeyPress('A')}>A</button>
                <button onClick={() => handleKeyPress('S')}>S</button>
                <button onClick={() => handleKeyPress('D')}>D</button>
                <button onClick={() => handleKeyPress('F')}>F</button>
                <button onClick={() => handleKeyPress('G')}>G</button>
                <button onClick={() => handleKeyPress('H')}>H</button>
                <button onClick={() => handleKeyPress('J')}>J</button>
                <button onClick={() => handleKeyPress('K')}>K</button>
                <button onClick={() => handleKeyPress('L')}>L</button>
            </div>
            <div className="keyboard-row row">
                <button onClick={() => handleKeyPress('Z')}>Z</button>
                <button onClick={() => handleKeyPress('X')}>X</button>
                <button onClick={() => handleKeyPress('C')}>C</button>
                <button onClick={() => handleKeyPress('V')}>V</button>
                <button onClick={() => handleKeyPress('B')}>B</button>
                <button onClick={() => handleKeyPress('N')}>N</button>
                <button onClick={() => handleKeyPress('M')}>M</button>
            </div>
        </div>
    );
}


