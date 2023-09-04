import "./Modal.css";
import {AiOutlineClose} from "react-icons/ai";

function Modal({ isVisible, content, onClose }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {content}
        <button onClick={onClose}><AiOutlineClose/></button>
      </div>
    </div>
  );
}

export default Modal;
