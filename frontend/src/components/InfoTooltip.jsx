import React from "react";
import allowAccess from "../images/allowAccess.png";
import deneyAccess from "../images/deneyAccess.png";
import closeButton from "../images/CloseIcon.png";
import { useNavigate } from "react-router-dom";

export default function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  const navigate = useNavigate();

  return (
    <div className={`popup ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__content">
        <section className="popup__body">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        >
          <img src={closeButton} alt="close icon" />
        </button>
        <div className="popup__message">
        <img
              className="popup__image" src={isSuccess ? allowAccess : deneyAccess}
            />
        <h4 className="popup__text">
          {message}
        </h4>
        </div>
        </section>
      </div>
    </div>
  );
}
