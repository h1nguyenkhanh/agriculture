import { Table, Button } from "antd";
import "antd/dist/antd.css";
import firebase from "firebase/config";
import React, { useEffect, useState, useContext } from "react";
import Context from "components/context/Context";
import "./css/process-table.css";
import ProcessApi from "services/ProcessApi";

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
    dataIndex: "action",
    render: (text, record) => <Button size="middle">Chi tiết</Button>,
  },
];

export default function ProcessTable(props) {
  const [rowCode, setRowCode] = useState(null);
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

  function onClickRow(record) {
    return {
      onClick: () => {
        if (record.DetailCode === rowCode) {
          setRowCode(null);
        } else {
          setRowCode(record.DetailCode);
        }
      },
    };
  }

  function setRowClassName(record) {
    return record.DetailCode === rowCode ? "rowSelected" : "";
  }

  return (
    <div className="table-wrapper">
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
        style={{ height: "500px" }}
        scroll={{ y: 340 }}
        className={"table-custom"}
        rowKey={(record) => record.DetailCode}
        onRow={onClickRow}
        rowClassName={setRowClassName}
        size={"small"}
      />
    </div>
  );
}
