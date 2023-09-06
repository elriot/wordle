import "./Modal.css";
import { AiOutlineClose } from "react-icons/ai";

function Modal({ isVisible, onClose, children }) {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}><AiOutlineClose /></button>
        {children}

      </div>
    </div>
  );
}

export default Modal;
