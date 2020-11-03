import { Layout, Menu, Affix } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/sidebar.css";

const { Sider } = Layout;

export default function SideBar() {
  const [activeMenu, setActiveMenu] = useState(false);

  function triggerMenu() {
    setActiveMenu(!activeMenu);
  }

  return (
    <Affix className={"menu-sticky"} offsetTop={0}>
      <Sider width={"auto"} className="site-layout-sider-light sidebar-wrapper">
        <div
          className={`menu-icon${activeMenu ? " change" : ""}`}
          onClick={triggerMenu}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <Menu
          mode="vertical"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ borderRight: 0 }}
          id="sidebar-menu"
          className={activeMenu ? "active" : ""}
        >
          <Menu.Item key="1">
            <Link to="/">Quy trình</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/">Nhật ký</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Affix>
  );
}
