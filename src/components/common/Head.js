import { Layout } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { Link } from "react-router-dom";
import "./css/head.css";

const { Header } = Layout;

export default function Head() {
  return (
    <Header className="header">
      <Link className="logo-link" to="/">
        <img src="images/logo.png" alt="" className="logo-img" />
        <h1>Farm</h1>
      </Link>
      <div className="header-option">
        <p>Xin chào <span>Khánh</span></p>
        <Link href="" className="header-user__logo" to="account">
          <img src="images/male-farmer.png" alt="" className="user-img"/>
        </Link>
      </div>
    </Header>
  );
}
