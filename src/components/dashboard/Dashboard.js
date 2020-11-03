import { Layout, Row, Col } from "antd";
import "antd/dist/antd.css";
import Head from "components/common/Head";
import SideBar from "components/common/SideBar";
import ProcessManage from "components/process/ProcessManage";
import React from "react";
import { Route, Switch } from "react-router-dom";
import "./css/dashboard.css";

export default function Dashboard() {
  return (
    <Layout className="main-layout">
      <Head />
      <Layout className="content-layout">
        <Row style={{width: "100%", height: "100%", margin: 0}} gutter={[16, 16]}>
          <Col xs={24} sm={24} md={5} xl={3}>
            <SideBar />
          </Col>
          <Col xs={24} sm={24} md={19} xl={21} style={{height: "100%"}}>
            <Switch>
              <Route path="/account"></Route>
              <Route path="/">
                <ProcessManage />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Layout>
    </Layout>
  );
}
