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

        <h1>Đăng nhập</h1>
        <Form.Item
          label="Tài khoản"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <br />
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">
            <Link to="dashboard">Đăng nhập</Link>
          </Button>          
        </Form.Item>
    
          <p style={{textAlign: "center"}}>Bạn chư có tài khoản? <Link to="register">Đăng ký</Link></p>       
        <div className="social-network-wrapper">
            <img src="images/facebook.png" alt="" className="logo-img" />
            <img src="images/google.png" alt="" className="logo-img" />
            <img src="images/phone.png" alt="" className="logo-img" />
        </div>
      </Form>
    </div>
  );
}

export default Login;
