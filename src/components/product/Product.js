import MyEditor from "components/product/MyEditor";
import { createEditorStateWithText } from "draft-js-plugins-editor";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
import "draft-js-static-toolbar-plugin/lib/plugin.css";
import React from "react";
import "./css/product.css";
import TinyEditor from "./TinyEditor";
function Product(props) {
  const { activeProduct } = props;
  return (
    <div className="main-content">
      <h2>{activeProduct && activeProduct.name}</h2>
        <TinyEditor/>
    </div>
  );
}


export default Product;
