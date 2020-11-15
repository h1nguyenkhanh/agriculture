import {
  FileAddOutlined,
  FileExcelOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Input, Layout, Modal } from "antd";
import React, { useState, useContext } from "react";
import "./css/process-manage.css";
import ProcessForm from "./ProcessForm";
import ProcessTable from "./ProcessTable";
import Context from "components/context/Context";
import Tools from "tools/Tools"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function ManageProcess(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const { activeProcess, isLoadingTable } = useContext(Context);

  function showModal() {
    setModalVisible(true);
  }

  function handleOk() {
    setModalVisible(false);
  }

  function handleCancel() {
    setModalVisible(false);
  }


  return (
    <Layout className="process-wrapper">
      <h2>Quy trình sản xuất {activeProcess&&activeProcess.ProcessName.toLowerCase()}</h2>
      <div>
      <Link to={`/process/step/${Tools.deleteMark(activeProcess?activeProcess.ProcessName:"")}`}>
          <Button
            className="btn btn-add"
            style={{ background: "#00A251" }}
            icon={<FileAddOutlined />}
            onClick={showModal}
          >
            Thêm công đoạn
          </Button>
        </Link>
      </div>
      {/* <div>
        <Search
          size="large"
          placeholder="Tìm kiếm quy trình"
          enterButton
          style={{ outline: 0, border: 0 }}
          className="search-input"
        />
      </div> */}
      <ProcessTable activeProcess={props.activeProcess} />
      {/* <Modal
        title="Thêm quy trình"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        centered={true}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk} style={{margin: "5px auto", display:"block"}}>
            Submit
          </Button>,
        ]}
      >
        <ProcessForm />
      </Modal> */}
    </Layout>
  );
}
