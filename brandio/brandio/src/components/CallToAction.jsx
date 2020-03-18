import "../assets/css/call-to-action.css";
import React from "react";

function CallToAction({ title, onClick }) {
  return (
    <div className="call-to-action" onClick={onClick}>
      {title}
    </div>
  );
}

export default CallToAction;
