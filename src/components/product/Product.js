import Context from "components/context/Context";
import React, { useContext } from "react";
import "./css/product.css";
import ProductDetail from "./ProductDetail";

function Product(props) {
  const {activeProduct, updateProduct, editProcessContent} = useContext(Context);

  function handleClick() {
    updateProduct({
      ...activeProduct,
      process: editProcessContent
    })
  }

  return (
    <div className="main-content">
      <h2>{activeProduct && activeProduct.name}</h2>
      <button onClick={handleClick}>Lưu</button>
      <ProductDetail />
    </div>
  );
}

export default Product;
