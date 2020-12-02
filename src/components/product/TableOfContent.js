import React from "react";
import "./css/toc.css";

function TableOfContent() {
  return (
    <div className="toc-wrapper">
      <div style={{
                position: "fixed",
                width: '200px',
                top: '50px',
                right: '30px',
                height: "auto",
                zIndex: 100,
                overflow: 'hidden'               
            }}>
        <div className="js-toc"></div>
      </div>
      <p>hii</p>
    </div>
  );
}

export default TableOfContent;
