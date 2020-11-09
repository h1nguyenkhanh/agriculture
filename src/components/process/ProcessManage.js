import {
  FileAddOutlined,
  FileExcelOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Input, Layout, Modal } from "antd";
import React, { useState } from "react";
import "./css/process-manage.css";
import ProcessForm from "./ProcessForm";
import ProcessTable from "./ProcessTable";

const { Search } = Input;

export default function ManageProcess(props) {
  const [modalVisible, setModalVisible] = useState(false);
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
      <h2>Quy trình sản xuất</h2>
      <div>
        <Button
          className="btn btn-add"
          style={{ background: "#00A251" }}
          icon={<FileAddOutlined />}
          onClick={showModal}
        >
          Thêm
        </Button>
        <Button
          className="btn btn-edit"
          style={{ background: "#3B8BC3" }}
          icon={<FormOutlined />}
        >
          Sửa
        </Button>
        <Button
          className="btn btn-delete"
          style={{ background: "#DF5037" }}
          icon={<FileExcelOutlined />}
        >
          Xóa
        </Button>
      </div>
      <div>
        <Search
          size="large"
          placeholder="Tìm kiếm quy trình"
          enterButton
          style={{ outline: 0, border: 0 }}
          className="search-input"
        />
      </div>
        <ProcessTable activeProcess={props.activeProcess} />
      <Modal
        title="Thêm quy trình"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ProcessForm />
      </Modal>
    </Layout>
  );
}
