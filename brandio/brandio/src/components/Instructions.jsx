import "../assets/css/instructions.css";
import React from "react";
import { Tag, Modal } from "carbon-components-react";

function Instructions({ visible, sizes, instructions, toggleInstructions }) {
  return (
    <Modal
      open={visible}
      modalHeading="Collaboration Details"
      primaryButtonText="Okay"
      onRequestSubmit={toggleInstructions}
    >
      <div className="sizes">
        <h4>Available sizes</h4>
        {sizes.map(size => {
          return <Tag type="purple">{size}</Tag>;
        })}
      </div>
      <div className="pointers">
        <h4>Instructions</h4>
        <p>{instructions}</p>
      </div>
    </Modal>
  );
}

export default Instructions;
