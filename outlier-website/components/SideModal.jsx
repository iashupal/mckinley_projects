import React from 'react';
import '../styles/side-modal.css';



function SideModal({ show, onExit, children, title }) {
  return (
    <div className={`modal__backdrop ${show ? 'modal__backdrop--show' : ''}`}>
      <div className="side_modal">
        <div className="modal__title-bar">
          <span className="modal__title">{title}</span>
          <button type="button" className="modal__btn-close" onClick={onExit}>
            ⨯
          </button>
        </div>
        <div className="modal__content-box">
          {children}
        </div>
      </div>
    </div>
  );
}


export default SideModal;
