import React from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        
        <button className="close-btn" onClick={onClose}>✖</button>

        {children}

      </div>
    </div>
  );
};

export default Modal;