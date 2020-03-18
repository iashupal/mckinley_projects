import React from 'react';
import PropTypes from 'prop-types';
function Form({children, title}){
    return(
        <div className="font-wrapper">
            <div className="font-wrapper-container">
                <div className="tab1-heading h3-heading">
                    <h3 className="h2-fontwght">{title}</h3>
                </div>
                <div className="textfield-wrapper">
                    {children}                             
                </div>
            </div> 
        </div>       
    );
}

export default Form;