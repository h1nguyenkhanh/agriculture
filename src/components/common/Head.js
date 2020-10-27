import { Layout } from "antd";
import "antd/dist/antd.css";
import React from "react";
import "./css/head.css";

const { Header } = Layout;

export default function Head() {
  return (
    <Header className="header">
      <a className="logo-link">
        <img src="images/logo.png" alt="" className="logo-img" />
        <h1>Farm</h1>
      </a>
      <div className="header-option">
        <p>Xin chào <span>Khánh</span></p>
        <a href="#" className="header-user__logo">
          <img src="images/male-farmer.png" alt="" className="user-img"/>
        </a>
      </div>
    </Header>
  );
}
