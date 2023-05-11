import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Image,
  Progress,
  InputNumber,
  Switch,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddArticlesForm = ({ onSubmit }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const onFinish = (values) => {
    // setIsSubmitting(true);
    setProgress(100);
    onSubmit(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleBeforeUpload = (file) => {
    setFile(file);
    return false;
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
      <Form.Item
        label="Title"
        name="name"
        rules={[{ required: true, message: "Please input a title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[
          { required: true, message: "Please input a content!" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Date Submitted"
        name="date_submitted"
        rules={[{ required: true, message: "Please select a date submitted!" }]}
      >
        <DatePicker></DatePicker>
      </Form.Item>
      <Form.Item
        label="Status"
        valuePropName="checked"
        rules={[{ required: true, message: "Please select a status!" }]}
      >
        <Switch />
      </Form.Item>
      <Form.Item
        label="Banner"
        name="banner"
        // rules={[{ required: true, message: "Please upload a banner!" }]}
      >
        <Upload
          name="banner"
          accept="image/*"
          beforeUpload={handleBeforeUpload}
          listType="picture"
          showUploadList={false}
        >
          {file ? (
            <Image
              src={URL.createObjectURL(file)}
              style={{ maxWidth: "100%", marginTop: 10 }}
            />
          ) : (
            <Button icon={<UploadOutlined />}>Upload</Button>
          )}
        </Upload>
        <Form.ErrorList />
      </Form.Item>
      <Form.Item>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {isSubmitting && (
            <Progress percent={progress} style={{ marginLeft: "10px" }} />
          )}
        </div>
      </Form.Item>
    </Form>
  );
};

export default AddArticlesForm;
