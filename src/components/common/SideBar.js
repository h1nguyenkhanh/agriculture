import { Affix, Button, Layout, Menu, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import firebase from "firebase/config";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import "antd/dist/antd.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tools from "tools/Tools";
import "./css/sidebar.css";
var db = firebase.firestore();

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SideBar(props) {
  const { productsData, handleProductOnClick } = props;

  function renderProductList() {
    let count = 0;
    return (
      productsData &&
      productsData.map((item, index) => {
        return (
          <SubMenu
            key={`sub${++index}`}
            icon={<AppstoreOutlined />}
            title={item.name}
          >
            {item.productList &&
              item.productList.map((item, index) => {
                return <Menu.Item key={++count} onClick={() => handleProductOnClick(item)}>{item.name}</Menu.Item>;
              })}
          </SubMenu>
        );
      })
    );
  }

  return (
    <Sider width={"250px"} className="site-layout-sider-light sidebar-wrapper">
      <form onSubmit={() => console.log("oke")}>
        <Input
          placeholder="Thêm quy trình"
          prefix={<PlusOutlined />}
          style={{
            paddingLeft: "5px",
            paddingRight: "5px",
            marginBottom: "10px",
          }}
        />
      </form>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        {renderProductList()}
      </Menu>
    </Sider>
  );
}
