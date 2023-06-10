import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Progress,
  Switch,
  InputNumber,
} from "antd";
import ExamService from "~/services/examService";

const { Option } = Select;

const AddExamForm = () => {
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const {createExam} = ExamService();

  const onFinish = async (values) => {
    const data = {
      ...values,
    }

    console.log(data);
    createExam(data);
    
    setProgress(100);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        label="Price"
        name="price"
        rules={[
          {
            required: true,
            type: "number",
            message: "Please input a price!",
          },
        ]}
      >
        <InputNumber
          addonAfter={<Form.Item noStyle>$</Form.Item>}
          style={{ width: "20%" }}
        />
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

export default AddExamForm;
