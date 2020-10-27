import { Layout } from "antd";
import "antd/dist/antd.css";
import Head from "components/common/Head";
import SideBar from "components/common/SideBar";
import Process from "components/process/Process";
import React from "react";
import './css/dashboard.css'

export default function Dashboard() {
  return (
    <Layout className="main-layout">
      <Head />
      <Layout className="content-layout">
        <SideBar />
        <Process />
      </Layout>
    </Layout>
  );
}
