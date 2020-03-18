import React from "react";

function Loader({ message }) {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      {message || "Loading"}
    </div>
  );
}

export default Loader;
