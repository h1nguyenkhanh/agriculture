import { Layout } from "antd";
import "antd/dist/antd.css";
import Head from "components/common/Head";
import SideBar from "components/common/SideBar";
import Provider from "components/context/Provider";
import Product from "components/product/Product";
import firebase from "firebase/config";
import React, { useEffect, useState } from "react";
import { useAuth } from "hooks/use-auth";
import { BrowserRouter as Router, Switch, Route, useRouteMatch} from "react-router-dom";

import {
  Link, useHistory,
  useLocation
} from "react-router-dom";

import "./css/dashboard.css";
import Account from "components/account/Account";

var db = firebase.firestore();

export default function Dashboard() {
  const [productsData, setProductsData] = useState(null);
  const [activeProduct, setActiveProduct] = useState({});
  const [currentUser, setCurrentUser] = useState(null)
  let { path, url } = useRouteMatch();

  const auth = useAuth();

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(function () {
    listenProductsData();
    getFirstProduct();
  }, []);

  useEffect(function () {
    if(auth.user.email) {
      console.log(auth.user.email);
      db.collection("users").where("email", "==", auth.user.email)
      .get()
      .then(function(querySnapshot) {
        const responseData = []
        querySnapshot.forEach(function(doc) {
          let data = { id: doc.id, ...doc.data() };
          responseData.push(data);
        });
        setCurrentUser(responseData[0])
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  
    }
  }, [auth]); 


  function listenProductsData() {
    db.collection("products").onSnapshot(
      (snapshot) => {
        console.log('snapshoot:', snapshot);
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
    currentUser,
    productsData,
    setProductsData,
    activeProduct,
    setActiveProduct,
    getFirstProduct
  };
console.log(currentUser);
  return (
    <Provider value={providerProps}>
      <Layout className="main-layout">
        <Head currentUser={currentUser}/>
        <Layout className="content-layout">
        <Switch>
          <Route path={`${path}/products`}>
            <>              
            <SideBar/>
            <Product></Product>
            </>
          </Route>
          <Route path={`${path}/account`}>
            <Account/>
          </Route>
          </Switch>
        </Layout>
      </Layout>
    </Provider>
  );
}
