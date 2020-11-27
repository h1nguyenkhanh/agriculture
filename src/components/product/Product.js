import Context from "components/context/Context";
import React, { useContext } from "react";
import "./css/product.css";
import ProductDetail from "./ProductDetail";
import ProductsApi from "services/ProductsApi";
import MyTocbot from "components/MyTocbot";

function Product(props) {
  const {
    activeProduct,
    editProcessContent,
    activeSubProducts,
    setActiveProduct,
  } = useContext(Context);

  

  // console.log(activeProduct, activeSubProducts);

  return (
    <div className="main-content">
      {/* {activeProduct && 
        <>
          <h2>{activeProduct.name}</h2>
          <ProductDetail />
        </>
      } */}
      <MyTocbot/>
    </div>
  );
}

export default Product;
