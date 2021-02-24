import { Button, Form, Input } from "antd";
import firebase from "firebase/config";
import { useAuth, useProvideAuth } from "hooks/use-auth";
import React, { useEffect } from "react";
import {
  Link, useHistory,
  useLocation
} from "react-router-dom";
import "./css/login.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

//Google singin provider
// var ggProvider = new firebase.auth.GoogleAuthProvider();
//Facebook singin provider
var fbProvider = new firebase.auth.FacebookAuthProvider();

function Login() {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  let {user, signin} = useAuth();

  useEffect(()=>{
    console.log(user);
  }, [user])

  function facebookProvider() {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
  }

  function phoneProvider() {
    function getPhoneNumberFromUserInput() {
      return "+84964808737";
    }
    const phoneNumber = getPhoneNumberFromUserInput();
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onFinish = (values) => {
    signin(values.email, values.password)
    .then(user=>{
      console.log(user);
      history.replace({pathname: "/dashboard/products"});
      // alert("Đăng nhập thành công!")
    })
    .catch(()=>{
      alert("Sai email hoặc mật khẩu!")
    })  
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleOnClickSignUp = () => {
    // console.log(authMethod);
    // // if(!useProvideAuth.signup) return;
    // authMethod.signup("user02@gmail.com","123456")
  }

  const handleOnClickSignIn = () => {
    // // if(!useProvideAuth.signup) return;
    // var t = authMethod.signin("user02@gmail.com","123456")
    // console.log(t);

  }

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
        <img src="images/logo2.png" alt="" className="login-logo" />

        <h1>Đăng nhập</h1>
        <Button onClick={handleOnClickSignUp}>Sign Up</Button>
        <Button onClick={handleOnClickSignIn}>Sign In</Button>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email không được để trống!",
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
              message: "Mật khẩu không được để trống!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <br />
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">
            {/* <Link to="dashboard">Đăng nhập</Link> */}
            Đăng nhập
          </Button>
        </Form.Item>

        <p style={{ textAlign: "center" }}>
          Bạn chư có tài khoản? <Link to="register">Đăng ký</Link>
        </p>
        <div className="social-network-wrapper">
          <img
            src="images/facebook.png"
            alt=""
            className="logo-img"
            onClick={facebookProvider}
          />
          <img
            src="images/google.png"
            alt=""
            className="logo-img"
            // onClick={googleProvider}
          />
          <img
            src="images/phone.png"
            alt=""
            className="logo-img"
            onClick={phoneProvider}
          />
        </div>
      </Form>
    </div>
  );
}

export default Login;
