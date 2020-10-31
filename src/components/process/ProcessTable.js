import React from "react";
import "antd/dist/antd.css";
import { Table, Button, Layout } from "antd";
import "./css/process-table.css";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data = [];
for (let i = 0; i < 43; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
export default function ProcessTable() {
  return (
    <div className="table-wrapper">
      <Table
        rowSelection={{
          type: "radio",
        }}
        sticky={true}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
          position: ["bottomCenter"],
        }}
        columns={columns}
        dataSource={data}
        style={{height: "500px"}}
        scroll={{ y: 340 }}
        className={"table-custom"}
      />
    </div>
  );
}
