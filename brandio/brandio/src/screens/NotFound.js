import React, { useContext } from "react";
import HeaderContext from "./../context/HeaderContext";

function NotFound() {
  const { lng, i18n } = useContext(HeaderContext);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "1fr",
        gridTemplateColumns: "1fr",
        width: "100vw",
        height: "100vh"
      }}
    >
      <div
        style={{
          alignSelf: "center",
          justifySelf: "center",
          textAlign: "center"
        }}
      >
        <h2>404</h2>
        <p>
          {" "}
          {i18n.t("misc.pageExist", {
            lng
          })}
        </p>
        {/* <p>이 페이지는 존재하지 않습니다</p> */}
      </div>
    </div>
  );
}

export default NotFound;
