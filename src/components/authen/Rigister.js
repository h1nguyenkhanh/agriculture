import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import "./css/login.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Login() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="authen-container">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
       <img src="images/logo2.png" alt="" className="login-logo"/>

        <h1>Đăng ký</h1>
        <Form.Item
          label="Họ tên"
          name="nickname"
          rules={[
            {
              required: true,
              message: "Họ tên không được để trống!",
            },
          ]}
        >
            <Input/>
        </Form.Item>
        <Form.Item
          label="Tài khoản"
          name="username"
          rules={[
            {
              required: true,
              message: "Tài khoản không được để trống!!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password1"
          rules={[
            {
              required: true,
              message: "Mật khẩu không được để trống!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nhập lại"
          name="password2"
          rules={[
            {
              required: true,
              message: "Nhập lại mật khẩu!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phonenumber"
          rules={[
            {
              required: true,
              message: "Số điện thoại không được để trống!!",
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <br />
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">
            <Link to="/">Hoàn tất</Link>
          </Button>          
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
