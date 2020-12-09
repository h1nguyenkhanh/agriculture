import React from "react";
import "./css/toc.css";

function TableOfContent() {
  return (
      <div style={{
                position: "fixed",
                width: "200px",
                top: "50px",
                right: "30px",
                height: "auto",
                zIndex: 99999999999,
                overflow: "hidden",              
            }}>
        <div className="js-toc"></div>
      </div>
  );
}

export default TableOfContent;
