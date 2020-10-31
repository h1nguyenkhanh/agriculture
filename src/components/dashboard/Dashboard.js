import { Layout } from "antd";
import "antd/dist/antd.css";
import Head from "components/common/Head";
import SideBar from "components/common/SideBar";
import ProcessManage from "components/process/ProcessManage";
import React from "react";
import { Route, Switch } from "react-router-dom";
import './css/dashboard.css';


export default function Dashboard() {
  return (
    <Layout className="main-layout">
      <Head />
      <Layout className="content-layout">
        <SideBar />
        <Switch>
          <Route path="/account">
          </Route>
          <Route path="/">
            <ProcessManage />
          </Route>
        </Switch>
      </Layout>
    </Layout>
  );
}
