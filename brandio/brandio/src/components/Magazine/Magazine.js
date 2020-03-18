import React from "react";
import "./../Magazine/Magazine.css";

function Magazine(props) {
  return (
    <div className="magazine">
      <h3 className="magazine__heading">MAGAZINE</h3>
      <div className="magazine__video">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/fjExl5Yud3M"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="youtube"
        ></iframe>
      </div>
    </div>
  );
}

export default Magazine;
