import { Table, Button, Space  } from "antd";
import "antd/dist/antd.css";
import firebase from "firebase/config";
import React, { useEffect, useState, useContext } from "react";
import Context from "components/context/Context";
import "./css/process-table.css";
import ProcessApi from "services/ProductsApi";

var db = firebase.firestore();
const columns = [
  {
    title: "Mã",
    dataIndex: "DetailCode",
  },
  {
    title: "Tiêu đề",
    dataIndex: "DetailTitle",
  },
  {
    title: "Nội dung",
    dataIndex: "DetailContent",
  },
  {
    title: "",
    fixed: 'right',
    width: 150,
    render: (text, record) => (
      <Space size="middle">
        <a>Sửa {record.ProcessName}</a>
        <a>Xóa</a>
      </Space>
    ),
  },
];

export default function ProcessTable(props) {
  const { activeProcess, isLoadingTable } = useContext(Context);
  const [processDetail, setProcessDetail] = useState(null);

  useEffect(() => {
    if (activeProcess) {
      let unsubscribe = db
        .collection(`Process/${activeProcess.Id}/ProcessDetail`)
        .onSnapshot(function (snapshot) {
          let data = [];
          snapshot.forEach(function (doc) {
            let objData = { DetailId: doc.id, ...doc.data() };
            data.push(objData);
          });
          setProcessDetail(data);
        });
      return function () {
        unsubscribe();
      };
    }
  }, [activeProcess]);

  return (
      <Table
        bordered={true}
        loading={isLoadingTable}
        sticky={true}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
          position: ["bottomCenter"],
        }}
        columns={columns}
        dataSource={processDetail}
        scroll={{ y: 500}}
        className={"table-custom"}
        rowKey={(record) => record.DetailCode}
        size={"small"}
      />
  );
}
