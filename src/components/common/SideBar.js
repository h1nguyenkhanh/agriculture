import { AppstoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import Context from "components/context/Context";
import React, { useContext } from "react";
import "./css/sidebar.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SideBar(props) {
  const {productsData,setActiveProduct, setActiveSubProducts} = useContext(Context);

  function handleProductOnClick(product, subProducts) {
    setActiveProduct(product);
    setActiveSubProducts(subProducts);
  }

  function renderProductList() {
    let count = 0;
    return (
      productsData &&
      productsData.map((item, index) => {
        let subProduct = item
        return (
          <SubMenu
            key={`sub${++index}`}
            icon={<AppstoreOutlined />}
            title={item.name}
          >
            {item.productList &&
              item.productList.map((item, index) => {
                return <Menu.Item key={++count} onClick={() => handleProductOnClick(item, subProduct)}>{item.name}</Menu.Item>;
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
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        {renderProductList()}
      </Menu>
    </Sider>
  );
}
