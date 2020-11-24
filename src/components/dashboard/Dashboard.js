import { Layout } from "antd";
import "antd/dist/antd.css";
import Head from "components/common/Head";
import SideBar from "components/common/SideBar";
import Provider from "components/context/Provider";
import Product from "components/product/Product";
import firebase from "firebase/config";
import React, { useEffect, useState } from "react";
import ProductsApi from "services/ProductsApi";
import "./css/dashboard.css";


var db = firebase.firestore();

export default function Dashboard() {
  const [productsData, setProductsData] = useState(null);
  const [activeSubProducts, setActiveProductList] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [editProcessContent, setEditProcessContent] = useState("");

  useEffect(function () {
    listenProductsData();
  }, []);

  function listenProductsData() {
    db.collection("products").onSnapshot(
      (snapshot) => {
        let responseData = [];
        snapshot.forEach(function (doc) {
          let data = { id: doc.id, ...doc.data() };
          responseData.push(data);
        });
        if (responseData.length > 0) {
          setProductsData(responseData);
          setIsLoadingTable(false);
          setActiveProductList(responseData[0]);
          setActiveProduct(responseData[0].productList[0]);
        }
      },
      (error) => {
        console.log("Loading data fail: " + error);
      }
    );
  }


  
  

/**
 * Sửa quy trình của một sản phẩm
 * @param {object} productData //Dữ liệu sản phẩm con mới
 * 
 */
  function updateProduct(productData) {
    // Kiểm tra danh sách sản phẩm con
    if (activeSubProducts) {
      // Lấy vị trí của sản phẩm trong danh sách sản phẩm con
      const productIndex = activeSubProducts.productList.indexOf(activeProduct);
      // Sao chép danh sách sản phẩm con ra 1 obj mới
      const newData = JSON.parse(JSON.stringify(activeSubProducts))
      // Thay đổi dữ liệu danh sách sản phẩm con
      newData.productList.splice(productIndex, 1, productData)
      // Cập nhật dữ liệu lên server
      ProductsApi.updateProduct(activeSubProducts.id, newData)
    }
  }

  function handleProductOnClick(product) {
    setActiveProduct(product);
  }

  const providerProps = {
    productsData,
    setProductsData,
    activeSubProducts,
    activeProduct,
    setActiveProduct,
    isLoadingTable,
    setIsLoadingTable,
    updateProduct,
    editProcessContent,
    setEditProcessContent
  };

  return (
    <Provider value={providerProps}>
      <Layout className="main-layout">
        <Head />
        <Layout className="content-layout">
          <SideBar
            productsData={productsData}
            handleProductOnClick={(product) => handleProductOnClick(product)}
          />
          <Product activeProduct={activeProduct}></Product>
        </Layout>
      </Layout>
    </Provider>
  );
}
