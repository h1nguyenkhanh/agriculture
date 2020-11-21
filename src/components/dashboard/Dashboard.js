import { Layout } from "antd";
import "antd/dist/antd.css";
import Head from "components/common/Head";
import SideBar from "components/common/SideBar";
import Provider from "components/context/Provider";
import Product from "components/product/Product";
import firebase from "firebase/config";
import React, { useEffect, useState } from "react";
import "./css/dashboard.css";

var db = firebase.firestore();

export default function Dashboard() {
  const [productsData, setProductsData] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [isLoadingTable, setIsLoadingTable] = useState(true);

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
        setProductsData(responseData);
        setIsLoadingTable(false);
        setActiveProduct(responseData[0].productList[0]);
      },
      (error) => {
        console.log("Loading data fail: " + error);
      }
    );
  }

  function handleProductOnClick(product) {
    setActiveProduct(product);
  }

  const providerProps = {
    productsData,
    setProductsData,
    activeProduct,
    setActiveProduct,
    isLoadingTable,
    setIsLoadingTable,
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
