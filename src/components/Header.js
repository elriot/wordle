import "./Header.css";
import {BiGame} from "react-icons/bi";
import { shareIcon, randomIcon, resetIcon, infoIcon } from "../utils/util";

function Header({ onHeaderButtonClick }) {
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <p className="title m-0 flex-grow-1"><BiGame/> WORDLE</p>
      <button
        className="btn btn-light"
        onClick={() => onHeaderButtonClick("random")}
      >
        {randomIcon()}
      </button>
      <button
        className="btn btn-light"
        onClick={() => onHeaderButtonClick("reset")}
      >
        {resetIcon()}
      </button>
      <button
        className="btn btn-light"
        onClick={() => onHeaderButtonClick("share")}
      >
        {shareIcon()}
      </button>
      <button
        className="btn btn-light"
        onClick={() => onHeaderButtonClick("info")}
      >
        {infoIcon()}
      </button>
    </div>
  );
}
export default Header;
