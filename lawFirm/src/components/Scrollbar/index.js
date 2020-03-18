import React from 'react';
import './style.css';

function Scrollbar({ children }) {
	return (
  <div className="scroll" id="style-3">
    <div className="force-overflow">{children}</div>
  </div>
	);
}

export default Scrollbar;
