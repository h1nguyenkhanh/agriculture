import React, {useState, useEffect} from 'react'
import Head from "components/common/Head";
import { Input, Layout, Menu, Button, Table, Tag, Space } from "antd";
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


const columns = [
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
      // render: tags => (
      //   <>
      //     {tags.map(tag => {
      //       let color = tag.length > 5 ? 'blue' : 'red';
      //       if (tag === 'admin') {
      //         color = 'volcano';
      //       }
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      username: "lvhdev99",
      name: 'Luu Hung',
      email: 'lvhdev99@gmail.com',
      tags: ['admin'],
    },
    {
      key: '2',
      username: "KhanhNguyen99",
      name: 'Khanh',
      email: 'khanhtd.vnua@gmail.com',
      tags: ['expert'],
    },
    {
      key: '3',
      username: "HoNet1021",
      name: 'VanHung',
      email: 'tranha12@gmail.com',
      tags: ['farmer'],
    },
  ];
  

function Account() {
  const [usersData, setUsersData] = useState(null)

  // const [currentUser, setCurrentUser] = useState(null)
  // const auth = useAuth();
  // useEffect(function () {
  //   if(auth.user.email) {
  //     console.log(auth.user.email);
  //     db.collection("users").where("email", "==", auth.user.email)
  //     .get()
  //     .then(function(querySnapshot) {
  //       const responseData = []
  //       querySnapshot.forEach(function(doc) {
  //         let data = { id: doc.id, ...doc.data() };
  //         responseData.push(data);
  //       });
  //       setCurrentUser(responseData)
  //     })
  //     .catch(function(error) {
  //         console.log("Error getting documents: ", error);
  //     });
  
  //   }
  // }, [auth]); 
  
  useEffect(()=>{
     listenUsersData();
  }, [])

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
        <div className={'account-wrapper'}>
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
            <div style={{paddingLeft:"100px"}}>
                <h2>Member</h2>
            </div>
            {usersData && <Table 
                className="table" 
                columns={columns} 
                dataSource={usersData} 
            />}
        </div> 
    )
}

export default Account
