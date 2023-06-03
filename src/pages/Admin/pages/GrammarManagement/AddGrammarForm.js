import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Progress,
  Switch,
} from "antd";
import grammarService from "~/services/grammarService";
const { Option } = Select;

const AddGrammarForm = () => {
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const { createGrammar } = grammarService();

  const onFinish = async (values) => {
    const data = {
      ...values,
    }
    console.log(data);
    // createGrammar(data);
    setProgress(100);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
      <Form.Item
        label="Text"
        name="text"
        rules={[{ required: true, message: "Please input a name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Means"
        name="means"
        rules={[
          { required: true, message: "Please input a means!" },
        ]}
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
        <Input />
      </Form.Item>

      <Form.Item
        label="Example"
        name="example"
        rules={[
          { required: true, message: "Please input a example!" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Level"
        name="level"
        rules={[{ required: true, message: "Please select a level!" }]}
      >
        <Select>
          <Option value=""></Option>
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
          <Button type="primary" htmlType="onsubmit">
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
