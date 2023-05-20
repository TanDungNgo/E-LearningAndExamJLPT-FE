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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddVocabularyForm = ({ onSubmit }) => {
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
        label="Text"
        name="text"
        rules={[{ required: true, message: "Please input a text!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Pronunciation"
        name="pronunciation"
        rules={[
          { required: true, message: "Please input a pronunciation!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Spelling"
        name="spelling"
        rules={[{ required: true, message: "Please select a spelling!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Meaning"
        name="meaning"
        rules={[
          {
            required: true,
            message: "Please input a meaning!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Example"
        name="example"
        rules={[
          { required: true, message: "Please input a price!", },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Audio"
        name="audio"
        rules={[{ required: true, message: "Please select a audio!" }]}
      >
        <Input />
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

export default AddVocabularyForm;
