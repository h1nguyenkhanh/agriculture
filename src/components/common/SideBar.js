import { Affix, Button, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Tools from "tools/Tools";
import "./css/sidebar.css";

const { Sider } = Layout;

export default function SideBar(props) {
  const [activeMenu, setActiveMenu] = useState(false);
  const { processData, handleProcessClick } = props;

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
        <Button>Add</Button>
        <Menu
          mode="vertical"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ borderRight: 0 }}
          id="sidebar-menu"
          className={activeMenu ? "active" : ""}
        >
          {processData &&
            processData.map((item, index) => {
              let linkUrl = `/${Tools.deleteMark(item.ProcessName)}`;
              return (
                <Menu.Item
                  key={++index}
                  onClick={() => handleProcessClick(item)}
                >
                  {item.ProcessName}
                </Menu.Item>
              );
            })}
        </Menu>
      </Sider>
    </Affix>
  );
}
