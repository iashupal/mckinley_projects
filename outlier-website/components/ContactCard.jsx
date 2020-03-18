import React from 'react';

const ContactCard = (props) => {
    return(
        <div className="contactCard">
            <div className="contactCardTitle">{props.title}</div>
            <div className="contactCardDescription">
                {props.children}
            </div>
        </div>
    );
}

export default ContactCard;