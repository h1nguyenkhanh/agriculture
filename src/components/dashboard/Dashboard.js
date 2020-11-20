import { Layout, Row, Col } from "antd";
import "antd/dist/antd.css";
import Head from "components/common/Head";
import SideBar from "components/common/SideBar";
import ProcessManage from "components/process/ProcessManage";
import React, { useEffect, useState } from "react";
import firebase from "firebase/config";
import "./css/dashboard.css";
import Provider from "components/context/Provider";
import InsertStep from "components/process/ProcessStep";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

var db = firebase.firestore();

export default function Dashboard() {
  const [productsData, setProductsData] = useState(null);
  const [activeProcess, setActiveProcess] = useState(null);
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
        setActiveProcess(responseData[0]);
      },
      (error) => {
        console.log("Loading data fail: " + error);
      }
    );
  }

  function handleProcessClick(process) {
    setActiveProcess(process);
  }

  const providerProps = {
    productsData,
    setProductsData,
    activeProcess,
    setActiveProcess,
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
            handleProcessClick={(process) => handleProcessClick(process)}
          />

          {/* <Col xs={24} sm={24} md={19} xl={21} style={{ height: "100%" }}>
              <Switch>
                <Route path="/">
                  <ProcessManage activeProcess={activeProcess} />
                </Route>
                <Route path="/step">
                  <InsertStep />
                </Route>
              </Switch>
            </Col> */}
        </Layout>
      </Layout>
    </Provider>
  );
}
