import {
    CloseOutlined, PlusOutlined
} from "@ant-design/icons";
import { Button, Input, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import firebase from "firebase/config";
import React, { useState } from "react";
import Tools from "tools/Tools";
  
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  var db = firebase.firestore();


function AddProduct(props) {
    const [stateButtonAdd, setStateButtonAdd] = useState(true);
    const [inputValue, setInputValue] = useState(null);
    const { product } = props;

    function addNewProduct() {      
      let productId = Tools.deleteVnMark(inputValue);
      const newProduct = {
        id: productId,
        name: inputValue,
      };

      db.collection(`/products/${product.id}/itemProcess`)
        .doc(productId)
        .set(newProduct)
        .then(function () {
          console.log("Ghi du lieu thanh cong");
          if (product.items) {
            product.items.push(newProduct);
          } else {
            product.items = [newProduct];
          }
        })
        .then(function (){
          db.collection(`products`)
            .doc(`${product.id}`)
            .update({
              items: product.items,
            })
            .then(function () {
              console.log("Cap nhat du lieu thanh cong");
            })
            .catch(function (error) {
              console.error("Cap nhat du lieu that bai: ", error);
            });
        })
        .catch(function (error) {
          console.error("Ghi du lieu that bai: ", error);
        });
    }

    function handleButtonAdd() {
      setStateButtonAdd(false);
    }
    function handleOnSubmitAddProduct(event) {
      event.preventDefault();
      // if (Tools.checkInput(inputValue) === false) {
      //   alert("Tên sản phẩm không được chứa kí tự đặc biệt!");
      //   return;
      // }
      addNewProduct();
      setStateButtonAdd(true);
    }

    function handleButtonCancel() {
      setStateButtonAdd(true);
    }

    return stateButtonAdd ? (
      <Button
        type="primary"
        className="category-button"
        onClick={handleButtonAdd}
      >
        <PlusOutlined />
      </Button>
    ) : (
      <div className="product-input">
        <form onSubmit={handleOnSubmitAddProduct}>
          <Input
            value={inputValue}
            placeholder="Thêm sản phẩm"
            onChange={(event) => setInputValue(event.target.value)}
          />
          <Button
            // shape="circle"
            danger
            type="primary"
            icon={<CloseOutlined />}
            onClick={handleButtonCancel}
          ></Button>
        </form>
      </div>
    );
  }

  export default AddProduct