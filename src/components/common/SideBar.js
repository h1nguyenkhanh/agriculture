import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React from "react";
import './css/sidebar.css'

const { Sider } = Layout;

export default function SideBar() {
  return (
      <Sider width={200} className="site-layout-sider-light">
        <Menu
          mode="vertical"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          theme="dark"
          id="sidebar-menu"
        >
          <Menu.Item key="1">Quy trình chăm sóc cây</Menu.Item>
          <Menu.Item key="2">Nhật ký</Menu.Item>
          <Menu.Item key="3">option1</Menu.Item>
        </Menu>
      </Sider>
  );
}
