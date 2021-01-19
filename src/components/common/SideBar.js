import {
  AppstoreOutlined,
  PlusOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Layout, Menu, Button } from "antd";
import firebase from "firebase/config";
import "antd/dist/antd.css";
import Context from "components/context/Context";
import React, { useContext, useState, useEffect } from "react";
import Tools from "tools/Tools";
import AddProduct from "./AddProduct";

import "./css/sidebar.css";

const { Sider } = Layout;
const { SubMenu } = Menu;
var db = firebase.firestore();

export default function SideBar() {
  const { productsData, setActiveProduct, activeProduct } = useContext(Context);
  const [productsDataDisplay, setProductsDataDisplay] = useState(null);
  const [newCategory, setNewCategory] = useState(null);

  useEffect(() => {
    setProductsDataDisplay(productsData);
  }, [productsData]);

  function searchCategory(event) {
    let searchText = Tools.deleteVnMark(event.target.value, false);
    let newData = productsData.filter((item, index) => {
      if (Tools.deleteVnMark(item.name).length >= searchText.length) {
        if (Tools.deleteVnMark(item.name).indexOf(searchText) > -1) {
          return item;
        }
      } else {
        if (searchText.indexOf(Tools.deleteVnMark(item.name)) > -1) {
          return item;
        }
      }
    });

    setProductsDataDisplay(newData);
  }

  function handleProductOnClick(productItem, productParent) {
    setActiveProduct({
      ...productItem,
      parentId: productParent.id,
    });
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    if (Tools.checkInput(newCategory) === false) {
      alert("Tên danh mục không được chứa kí tự đặc biệt!");
      return;
    }
    db.collection("products")
      .doc(Tools.deleteVnMark(newCategory))
      .set({
        name: newCategory,
      })
      .then(() => {
        setNewCategory(null);
      });
  }

  function handleOnInputChange(event) {
    setNewCategory(event.target.value);
  }

  function renderProductList() {
    return (
      Array.isArray(productsDataDisplay) &&
      productsDataDisplay.map((product) => {
        return (
          <SubMenu key={product.id} title={product.name}>
            {Array.isArray(product.items) &&
              product.items.map((item) => {
                return (
                  <Menu.Item
                    key={item.id}
                    onClick={() => handleProductOnClick(item, product)}
                  >
                    {item.name}
                  </Menu.Item>
                );
              })}
            <AddProduct product={product} />
          </SubMenu>
        );
      })
    );
  }
  return (
    <Sider width={"210px"} className="site-layout-sider-light sidebar-wrapper">
      <Input
        placeholder="Tìm kiếm"
        onChange={searchCategory}
        prefix={<SearchOutlined />}
        style={{
          paddingLeft: "5px",
          paddingRight: "5px",
          marginBottom: "10px",
        }}
      />
      <br />
      <form onSubmit={handleOnSubmit}>
        <Input
          onChange={handleOnInputChange}
          value={newCategory}
          placeholder="Thêm danh mục"
          prefix={<PlusOutlined />}
          style={{
            paddingLeft: "5px",
            paddingRight: "5px",
            marginBottom: "10px",
          }}
        />
      </form>
      {
        activeProduct
        &&
        <Menu
        defaultSelectedKeys={[activeProduct.id?activeProduct.id:'']}
        defaultOpenKeys={[activeProduct.id?activeProduct.parentId:'']}
        // defaultSelectedKeys={['sa]']}
        // defaultOpenKeys={['cam']}
        mode="inline"
      >
        {renderProductList()}
      </Menu>
      }
      
    </Sider>
  );
}
