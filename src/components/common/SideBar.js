import { AppstoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import Context from "components/context/Context";
import React, { useContext } from "react";
import "./css/sidebar.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SideBar(props) {
  const { productsData, setActiveProduct } = useContext(Context);

  console.log(productsData);

  function handleProductOnClick(productItem, productParent) {
    setActiveProduct({
      ...productItem,
      parentId: productParent.id,
    });
  }

  function renderProductList() {
    let countIndex = 0;
    return (
      productsData &&
      productsData.map((product, productIndex) => {
        return (
          <SubMenu
            key={`sub${++productIndex}`}
            icon={<AppstoreOutlined />}
            title={product.name}
          >
            {product.items &&
              product.items.map((item, itemIndex) => {
                return (
                  <Menu.Item
                    key={`${++countIndex}`}
                    onClick={() => handleProductOnClick(item, product)}
                  >
                    {item.name}
                  </Menu.Item>
                );
              })}
          </SubMenu>
        );
      })
    );
  }

  return (
    <Sider width={"210px"} className="site-layout-sider-light sidebar-wrapper">
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
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        {renderProductList()}
      </Menu>
    </Sider>
  );
}
