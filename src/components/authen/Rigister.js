import React, {useState} from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Link, Redirect } from "react-router-dom";
import "./css/login.css";
import firebase from "firebase/config";
import Tools from "../../tools/Tools";
import { useAuth, useProvideAuth } from "hooks/use-auth";

var db = firebase.firestore();

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Register() {
  let [isSuccess, setIsSuccess] = useState(false);
  let authMethod = useProvideAuth();

  const onFinish = (values) => {
    console.log("Success:", values);
    // authMethod.signup(values.email,values.password)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validatePhoneNumber = ({ getFieldValue }) => ({
    validator(_, value) {
      const result = Tools.checkPhoneNumber(value);
      if (!value || result) {
        return Promise.resolve();
      }
      return Promise.reject("Số điện thoại không đúng!");
    },
  });

  const signUp = (newUser) => {
    if(!newUser) {
      alert('Đăng ký thất bại!')
      return;
    }
    db.collection("users")
      .get()
      .then(function (snapshot) {
        console.log(1);
        let responseData = [];
        snapshot.forEach(function (doc) {
          let data = { id: doc.id, ...doc.data() };
          responseData.push(data);
        });
        let isExist = responseData.map(item=>item.email).indexOf(newUser.email)
        if(isExist===-1) {
          const newId = Tools.getNewIdCode(responseData, "user")
          return newId;
        } 
        else {
          throw new Error("Tài khoản đã tồn tại trên hệ thống!");
        }    
      })
      .then(newId=>{
        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .catch(function (error) {
            if(error.code)
                console.log(error.code);   
        });      
        db.collection("users").doc(newId).set({
          username: newUser.username,
          email: newUser.email,
          phonenumber: newUser.phonenumber,
          role: "member"
        })
      })
      .then(function() {
        setIsSuccess(true);
        alert("Đăng ký thành công!");
      })
      .catch(function (error) {
        // alert("Đăng ký thất bại!")
        alert(error.message);
      });
  };

  

  return (
    isSuccess
    ?
    <Redirect to='/'/>
    :
    <div className="authen-container">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={signUp}
        onFinishFailed={onFinishFailed}
      >
        <img src="images/logo2.png" alt="" className="login-logo" />

        <h1>Đăng ký</h1>
        <Form.Item
          label="Họ tên"
          name="username"
          rules={[
            {
              required: true,
              message: "Họ tên không được để trống!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email không được để trống!",
            },
            {
              type: "email",
              message: "Định dạng email không đúng!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          hasFeedback
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
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Mật khẩu không khớp!");
              },
            }),
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
            validatePhoneNumber,
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit" type="primary">
            Hoàn tất
          </Button>
        </Form.Item>
        <p style={{textAlign:"center"}}>Bạn đã có tài khoản? <Link to="/">Đăng nhập</Link></p>
      </Form>
    </div>
  );
}

export default Register;
