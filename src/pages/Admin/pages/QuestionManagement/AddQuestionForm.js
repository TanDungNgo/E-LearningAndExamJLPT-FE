import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Progress,
  Switch,
} from "antd";

const { Option } = Select;

const AddVocabularyFolderForm = () => {
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(true);

  const onFinish = async (values) => {
    const data = {
      ...values,
    }

    console.log(data);
    // createVocabularyFolder(data);
    
    setProgress(100);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input a title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Text"
        name="text"
        rules={[{ required: true, message: "Please input a text!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true, message: "Please input a image!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Audio File"
        name="audioFile"
        rules={[{ required: true, message: "Please input a audioFile!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Option1"
        name="option1"
        rules={[{ required: true, message: "Please input a option1!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Option2"
        name="option2"
        rules={[{ required: true, message: "Please input a option2!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Option3"
        name="option3"
        rules={[{ required: true, message: "Please input a option3!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Option4"
        name="option4"
        rules={[{ required: true, message: "Please input a option4!" }]}
      >
        <Input />
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

export default AddVocabularyFolderForm;
