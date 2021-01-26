import React from 'react'
import Head from "components/common/Head";
import { Input, Layout, Menu, Button, Table, Tag, Space } from "antd";
import "antd/dist/antd.css";
import "./css/account.css";
import {
    AppstoreOutlined,
    PlusOutlined,
    CloseOutlined,
    SearchOutlined,
} from "@ant-design/icons";

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
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'blue' : 'red';
            if (tag === 'admin') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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
    return (
        <div>
            <Head />
            
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
            <Table 
                className="table" 
                columns={columns} 
                dataSource={data} 
            />
        </div> 
    )
}

export default Account
