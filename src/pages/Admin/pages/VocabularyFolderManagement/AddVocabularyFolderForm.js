import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Progress,
  Switch,
} from "antd";
import vocabularyFolderService from "~/services/vocabularyFolderService";

const { Option } = Select;

const AddVocabularyFolderForm = () => {
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const { createVocabularyFolder } = vocabularyFolderService();

  const onFinish = async (values) => {
    const data = {
      ...values,
    }

    console.log(data);
    createVocabularyFolder(data);
    
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

export default AddVocabularyFolderForm;
