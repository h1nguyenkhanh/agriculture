import React, { useState, useEffect,useContext } from "react";
import Head from "components/common/Head";
import {
  Input,
  Layout,
  Form,
  Menu,
  Button,
  Table,
  Tag,
  Space,
  Modal,
  Select,
} from "antd";
import * as admin from "firebase-admin";
import Context from "components/context/Context";

import "antd/dist/antd.css";
import "./css/account.css";
import { useAuth } from "hooks/use-auth";
import firebase from "firebase/config";

import {
  AppstoreOutlined,
  PlusOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";

var db = firebase.firestore();

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Tên người dùng",
    dataIndex: "username",
    key: "username",
  },

  {
    title: "Role",
    key: "role",
    dataIndex: "role",
    render: (role) =>
      role && (
        <Tag
          color={
            role === "member" ? "green" : role === "expert" ? "blue" : "red"
          }
        >
          {role.toUpperCase()}{" "}
        </Tag>
      ),
  },
];

function Account() {
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userClicked, setUserClicked] = useState(null);
  const [form] = Form.useForm();
  const { currentUser } = useContext(Context);

  // admin.initializeApp({
  //   credential: admin.credential.applicationDefault(),
  //   databaseURL: "https://react-firebase-app-de3b8.firebaseio.com",
  // });

  useEffect(() => {
    const listener = listenUsersData();
    return listener;
  }, []);

  useEffect(() => {
    if (!userClicked) return;
    form.setFieldsValue(userClicked);
  }, [userClicked]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {};

  const handleCancel = () => {
    setVisible(false);
  };

  const handleFormSubmit = (values) => {
    if(currentUser.role !== 'admin') {
      alert('Chỉ quản trị viên mới có quyền thực hiện chức năng này!')
      return
    }
    console.log("Success:", values);
    delete values.id;
    delete values.email;
    db.collection("users")
      .doc(userClicked.id)
      .update(values)
      .then(function () {
        alert("Cap nhat du lieu thanh cong");
      })
      .catch(function (error) {
        console.error("Cap nhat du lieu that bai: ", error);
      });
  };

  const deleteUser = () => {
    if(currentUser.role !== 'admin') {
      alert('Chỉ quản trị viên mới có quyền thực hiện chức năng này!')
      return
    }
    const result = window.confirm("Bạn có chắc không?");
    if(!result) return;
    db.collection("users")
      .doc(userClicked.id)
      .delete()
      .then(function () {
        alert("Xóa thành viên thành công");
      })
      .catch(function (error) {
        console.error("Xoa du lieu that bai: ", error);
      });
  };

  function adminOnly() {
    
  }

  function listenUsersData() {
    db.collection("users").onSnapshot(
      (snapshot) => {
        let responseData = [];
        snapshot.forEach(function (doc) {
          let data = { id: doc.id, ...doc.data() };
          responseData.push(data);
        });
        if (responseData.length > 0) {
          setUsersData(responseData);
        }
      },
      (error) => {
        console.log("Loading data fail: " + error);
      }
    );
  }
  return (
    <div className={"account-wrapper"}>
      <Input
        className="search"
        placeholder="Tìm kiếm"
        prefix={<SearchOutlined />}
        style={{
          paddingLeft: "5px",
          paddingRight: "5px",
          marginBottom: "10px",
        }}
      />
      <div style={{ paddingLeft: "100px" }}>
        <h2>Thành viên</h2>
      </div>
      {usersData && (
        <Table
          className="table"
          columns={columns}
          dataSource={usersData.map((item, index) => {
            return { ...item, key: index };
          })}
          onRow={(record, rowIndex) => {
            return {
              onClick: async (event) => {
                setUserClicked(record);
                showModal();
              }, // click row
              onDoubleClick: (event) => {}, // double click row
              onContextMenu: (event) => {}, // right button click row
              onMouseEnter: (event) => {}, // mouse enter row
              onMouseLeave: (event) => {}, // mouse leave row
            };
          }}
        />
      )}
      {userClicked && (
        <Modal
          visible={visible}
          title={`Thông tin người dùng ${userClicked.username}`}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
        >
          <Form
            {...layout}
            initialValues={userClicked}
            name="control-hooks"
            onFinish={handleFormSubmit}
            form={form}
          >
            <Form.Item name="id" label="ID">
              <Input disabled />
            </Form.Item>
            <Form.Item name="email" label="Địa chỉ email">
              <Input disabled />
            </Form.Item>
            <Form.Item name="username" label="Tên người dùng">
              <Input />
            </Form.Item>

            <Form.Item name="phonenumber" label="Số điện thoại">
              <Input />
            </Form.Item>
            <Form.Item name="role" label="Vai trò">
              <Select>
                <Select.Option value="member">Thành viên</Select.Option>
                <Select.Option value="expert">Chuyên gia</Select.Option>
              </Select>
            </Form.Item>

            <div style={{ justifyContent: "center", display: "flex" }}>
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
              >
                Cập nhật
              </Button>
              <div style={{ marginRight: 10, marginLeft: 10 }}></div>
              <Button
                type="danger"
                // loading={loading}
                onClick={deleteUser}
              >
                Xóa
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default Account;
