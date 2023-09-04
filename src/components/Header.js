import "./Header.css";
import { RxReset } from "react-icons/rx";
import {BsShare} from "react-icons/bs";

function Header({ onHeaderButtonClick }) {
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <p className="title m-0 flex-grow-1">WORDLE</p>
      <button className="btn btn-secondary" onClick={()=>onHeaderButtonClick("reset")}>
        <RxReset />
      </button>
      <button className="btn btn-secondary" onClick={()=>onHeaderButtonClick("share")}>
        <BsShare />
      </button>
    </div>
  );
}
export default Header;
