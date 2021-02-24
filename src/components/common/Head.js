import { Layout } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { Link } from "react-router-dom";
import "./css/head.css";

const { Header } = Layout;

export default function Head({currentUser}) {
  return (
    <div style={{position: "fixed", width:"100%", height:"75px", zIndex: 9999, top: 0}}>
      <Header className="header">
        <Link className="logo-link" to="/dashboard/products">
          <img src="../images/logo.png" alt="" className="logo-img" />
          <h1>Farm</h1>
        </Link>
        <div className="header-option">
          <p>
            Xin chào <span>{currentUser&&currentUser[0].username}</span>
          </p>
          <Link href="" className="header-user__logo" to="/dashboard/account">
            <img src="../images/male-farmer.png" alt="" className="user-img" />
          </Link>
        </div>
      </Header>
      <div style={{height: "10px", backgroundColor: "#F0F2F5"}}/>
    </div>
  );
}
