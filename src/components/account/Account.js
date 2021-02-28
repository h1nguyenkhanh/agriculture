import React, { useState, useEffect } from "react";
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
    title: "Tên người dùng",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
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
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    username: "lvhdev99",
    name: "Luu Hung",
    email: "lvhdev99@gmail.com",
    tags: ["admin"],
  },
  {
    key: "2",
    username: "KhanhNguyen99",
    name: "Khanh",
    email: "khanhtd.vnua@gmail.com",
    tags: ["expert"],
  },
  {
    key: "3",
    username: "HoNet1021",
    name: "VanHung",
    email: "tranha12@gmail.com",
    tags: ["farmer"],
  },
];

function Account() {
  const [usersData, setUsersData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userClicked, setUserClicked] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    listenUsersData();
  }, []);

  useEffect(() => {
    console.log('thay doi');
    form.setFieldsValue(userClicked)
  }
  , [userClicked]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);

    // this.setState({ loading: true });
    // setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleFormSubmit = (values) => {
    console.log("Success:", values);
  };

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
  if(userClicked) console.log(userClicked)
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
          >
            <Form.Item name="username" label="Tên người dùng">
              <Input value={userClicked.username} />
            </Form.Item>
            <Form.Item name="email" label="Địa chỉ email">
              <Input value={userClicked.email} />
            </Form.Item>
            <Form.Item name="phonenumber" label="Số điện thoại">
              <Input value={userClicked.phonenumber} />
            </Form.Item>
            <Form.Item name="role" label="Vai trò">
              <Select>
                <Select.Option value="member">Thành viên</Select.Option>
                <Select.Option value="expert">Chuyên gia</Select.Option>
              </Select>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                // loading={loading}
                // onClick={handleOk}
              >
                Lưu
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default Account;
