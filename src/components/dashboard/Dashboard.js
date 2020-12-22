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

  useEffect(function () {
    listenProductsData();
    getFirstProduct();
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
        }
      },
      (error) => {
        console.log("Loading data fail: " + error);
      }
    );
  }

  function getFirstProduct() {
    db.collection("products")
      .get()
      .then(function (snapshot) {
        let responseData = [];
        snapshot.forEach(function (doc) {
          let data = { id: doc.id, ...doc.data() };
          responseData.push(data);
        });
        if (responseData.length > 0) {
          const firstActiveProduct = {
            ...responseData[0].items[0],
            parentId: responseData[0].id,
          };
          setActiveProduct(firstActiveProduct);
        }
      })
      .catch(function (error) {
        console.error("Lay du lieu that bai: ", error);
      });
  }

  const providerProps = {
    productsData,
    setProductsData,
    activeProduct,
    setActiveProduct,
  };

  return (
    <Provider value={providerProps}>
      <Layout className="main-layout">
        <Head />
        <Layout className="content-layout">
          <SideBar />
          {activeProduct && <Product activeProduct={activeProduct}></Product>}
          {/* <Test /> */}
        </Layout>
      </Layout>
    </Provider>
  );
}
