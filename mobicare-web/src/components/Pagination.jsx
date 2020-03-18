import React from "react";
import { Pagination as Paginate } from "antd";
import PropTypes from "prop-types";

import "../assets/styles/pagination.css";

function Pagination({ current, changeHandler, totalRecords, pageSize }) {
  return (
    <Paginate
      className="top-margin"
      size="small"
      current={current}
      onChange={changeHandler}
      pageSize={pageSize}
      total={totalRecords}
    />
  );
}

Pagination.propTypes = {
  current: PropTypes.number,
  changeHandler: PropTypes.func,
  totalRecords: PropTypes.number
};

Pagination.defaultProps = {
  current: 1,
  totalRecords: 10,
  pageSize: 10
};

export default Pagination;
