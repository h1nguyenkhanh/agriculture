import { Form, Input } from "antd";
import UploadProcessImg from 'components/process/UploadProcessImg';
import React from "react";
import "./css/process-manage.css";



export default function ProcessForm() {
  const [form] = Form.useForm();

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  return (
    <Form
      form={form}
      layout="vertical"
      name="addProcessForm"
      //   initialValues={{ modifier: "public" }}
    >
      <Form.Item
        name="processCode"
        label="Mã quy trình"
        rules={[{ required: true, message: "Không được để trống trường này!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="processName"
        label="Tên quy trình"
        rules={[{ required: true, message: "Không được để trống trường này!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="processAvatar"
        label="Ảnh quy trình"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <UploadProcessImg />
      </Form.Item>
    </Form>
  );
}
