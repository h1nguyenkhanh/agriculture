import {
  FileAddOutlined,
  FileExcelOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Input, Layout, Modal, Row, Col } from "antd";
import React, { useState, useContext } from "react";
import "./css/process-manage.css";
import ProcessForm from "./ProcessForm";
import ProcessTable from "./ProcessTable";
import Context from "components/context/Context";
import ProcessStep from "components/process/ProcessStep";
import Tools from "tools/Tools";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

  const activeProcessUrl = Tools.deleteMark(
    activeProcess ? activeProcess.ProcessName : ""
  );

  return (
    <Layout className="process-wrapper">
      {/* <Row>
        <Col span={24}>
          <h2>
            Quy trình sản xuất{" "}
            {activeProcess && activeProcess.ProcessName.toLowerCase()}
          </h2>
        </Col>
      </Row> */}
      {/* <Row>
        <Col span={24}>
          <Link to={`/dashboard/step`}>
            <Button
              className="btn btn-add"
              style={{ background: "#00A251", marginBottom: "20px" }}
              icon={<FileAddOutlined />}
              onClick={showModal}
            >
              Thêm công đoạn
            </Button>
          </Link>
        </Col>
      </Row> */}
      <Row style={{height: "100%"}}>
        <Col span={24} style={{height: "100%"}}>
          <Switch>
            <Route exact path={`/dashboard`}>
              <ProcessTable activeProcess={props.activeProcess} />
            </Route>
            <Route path={`/dashboard/step`}>
              <ProcessStep />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Layout>
  );
}
