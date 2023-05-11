import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Image,
  Progress,
  Switch,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddLessonForm = ({ onSubmit }) => {
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
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input a name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input a description!" },
          {
            max: 100,
            message: "Description should be less than 100 characters!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label = "Link Video"
        name= "linkvideo"
        rules={[
          {required: true, message: "Please input a link video!"}
        ]}>
          <Input/>

      </Form.Item>
      <Form.Item
        label="Status"
        valuePropName="checked"
        rules={[{ required: true, message: "Please select a status!" }]}
      >
        <Switch />
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

export default AddLessonForm;
