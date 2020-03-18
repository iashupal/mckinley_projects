import React from "react";

function Editor(props) {
  const url  = (props.location.pathname + props.location.search).split("/editor")[1]
  return (
    <iframe
      src={`https://fandio-editor.surge.sh${url}`}
      style={{ width: "100vw", height: "100vh", border: "none" }}
      title="Collaboration Editor"
    ></iframe>
  );
}

export default Editor;
