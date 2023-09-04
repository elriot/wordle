import "./Header.css";
import { RxReset } from "react-icons/rx";
import { BsShare } from "react-icons/bs";
import { LiaRandomSolid } from "react-icons/lia";
import { FaInfoCircle } from "react-icons/fa";
import {BiGame} from "react-icons/bi";

function Header({ onHeaderButtonClick }) {
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <p className="title m-0 flex-grow-1"><BiGame/> WORDLE</p>
      <button
        className="btn btn-light"
        onClick={() => onHeaderButtonClick("random")}
      >
        <LiaRandomSolid />
      </button>

      <button
        className="btn btn-light"
        onClick={() => onHeaderButtonClick("reset")}
      >
        <RxReset />
      </button>


      <button
        className="btn btn-light"
        onClick={() => onHeaderButtonClick("share")}
      >
        <BsShare />
      </button>
      <button
        className="btn btn-light"
        onClick={() => onHeaderButtonClick("info")}
      >
        <FaInfoCircle />
      </button>
    </div>
  );
}
export default Header;
