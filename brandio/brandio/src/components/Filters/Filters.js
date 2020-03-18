import React from "react";
import "./../Filters/Filters.css";

function Filters(props) {
  return (
    <div className="filters">
      <h5 className="filters__heading">
        {i18n.t('navigation.brand', { lng })} <label>(3,212)</label>
      </h5>
    </div>
  );
}

export default Filters;
