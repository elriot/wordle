import "./Header.css";
import { RxReset } from "react-icons/rx";

function Header({ onRefreshClick }) {
  const onClickRefresh = () => {
    // console.log("refresh clicked");
    onRefreshClick();
  };
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <div></div> {/* 빈 div 추가 */}
      <p className="title text-center m-0 flex-grow-1">Header</p>
      <button className="btn btn-secondary" onClick={onClickRefresh}>
        <RxReset />
      </button>
    </div>
  );
}
export default Header;
