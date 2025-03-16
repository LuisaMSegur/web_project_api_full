import React from "react";
import closeButton from "../../../../images/CloseIcon.png";
export default function Popup(props) {
  const { onClose, title, children } = props;

  return (
    <div className="popup popup_open">
      <div className="popup__content">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        >
          <img src={closeButton} alt="close icon" />
        </button>
        {title && <h3 className="popup__title">{title}</h3>}
        <div className="popup__body">{children}</div>
      </div>
    </div>
  );
}