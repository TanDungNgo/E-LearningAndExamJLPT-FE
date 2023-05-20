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

const AddGrammarForm = ({ onSubmit }) => {
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
        name="text"
        rules={[{ required: true, message: "Please input a name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Explanation"
        name="explanation"
        rules={[
          { required: true, message: "Please input a explanations!" },
          {
            max: 100,
            message: "Explanations should be less than 100 characters!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Example"
        name="example"
        rules={[
          { required: true, message: "Please input a example!" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Means"
        name="means"
        rules={[
          { required: true, message: "Please input a means!" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Level"
        name="level"
        rules={[{ required: true, message: "Please select a level!" }]}
      >
        <Select>
          <Option value="N1">N1</Option>
          <Option value="N2">N2</Option>
          <Option value="N3">N3</Option>
          <Option value="N4">N4</Option>
          <Option value="N5">N5</Option>
        </Select>
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

export default AddGrammarForm;
