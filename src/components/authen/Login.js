
import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import firebase from "firebase/config";
import "./css/login.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

//Google singin provider
var ggProvider = new firebase.auth.GoogleAuthProvider();
//Facebook singin provider
var fbProvider = new firebase.auth.FacebookAuthProvider();

function Login() {
  function googleProvider () {
    firebase.auth()
      .signInWithPopup(ggProvider)
      .then((result) => {
      var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      console.log(token);
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      }).catch((error) => {
        //thong bao loi
        console.log(error);
      });
  };

  function facebookProvider () {
    firebase.auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;
        console.log(user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        console.log(accessToken);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  function phoneProvider() {
    function getPhoneNumberFromUserInput() {
      return "+84964808737";
    }
    const phoneNumber = getPhoneNumberFromUserInput();
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        }).catch((error) => {
          console.log(error);
        });
  }

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
            <img 
              src="images/facebook.png" alt="" 
              className="logo-img"
              onClick={facebookProvider}
            />
            <img 
              src="images/google.png" alt="" 
              className="logo-img" 
              onClick={googleProvider}
            />
            <img 
              src="images/phone.png" alt="" 
              className="logo-img" 
              onClick={phoneProvider}  
            />
        </div>
      </Form>
    </div>
  );
}

export default Login;

