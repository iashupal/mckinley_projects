import React from 'react';
import '../styles/popup.css';

function Popup({ show, children, toggle, header }) {

    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div className="popupContainer">
                <div className="popupHeader">
                    <span className="popupHeaderContent">{header}</span>
                    <span className="popupClose" onClick={() => toggle()}>x</span>
                </div>
                <div className="popupContainer">
                    {children}
                </div>
            </div>
        </div>
    );
}



export default Popup;
