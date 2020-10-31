import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { Link } from "react-router-dom";
import './css/sidebar.css';

const { Sider } = Layout;

export default function SideBar() {
  return (
      <Sider width={200} className="site-layout-sider-light sidebar-wrapper">
        <Menu
          mode="vertical"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          theme="dark"
          id="sidebar-menu"
        >
          <Menu.Item key="1">
            <Link to="/">Quy trình</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/">Nhật ký</Link>
          </Menu.Item>
          {/* <Menu.Item key="3"></Menu.Item> */}
        </Menu>
      </Sider>
  );
}
