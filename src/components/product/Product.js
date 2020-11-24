import Context from "components/context/Context";
import React, { useContext } from "react";
import "./css/product.css";
import ProductDetail from "./ProductDetail";
import ProductsApi from "services/ProductsApi";

function Product(props) {
  const { activeProduct, editProcessContent, activeSubProducts, setActiveProduct } = useContext(
    Context
  );

  /**
   * Sửa quy trình của một sản phẩm
   */
  function updateProduct() {
    // Kiểm tra danh sách sản phẩm con
    if (activeSubProducts) {
      // // Lấy vị trí của sản phẩm trong danh sách sản phẩm con
      const productIndex = activeSubProducts.productList.indexOf(activeProduct);
      // Sao chép danh sách sản phẩm con ra 1 obj mới
      const newData = JSON.parse(JSON.stringify(activeSubProducts));
      // Thay đổi dữ liệu danh sách sản phẩm con
      newData.productList.splice(productIndex, 1, {
        ...activeProduct,
        process: editProcessContent,
      });
      let t = activeProduct
      // Cập nhật dữ liệu lên server
      ProductsApi.updateProduct(activeSubProducts.id, newData);
    }
  }

  // console.log(activeProduct, activeSubProducts);

  return (
    <div className="main-content">
      <h2>{activeProduct && activeProduct.name}</h2>
      <button onClick={updateProduct}>Lưu</button>
      <ProductDetail />
    </div>
  );
}

export default Product;
