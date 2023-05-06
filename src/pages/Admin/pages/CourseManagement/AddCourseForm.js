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

const AddCourseForm = ({ onSubmit }) => {
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
        label="Type"
        name="type"
        rules={[{ required: true, message: "Please select a type!" }]}
      >
        <Select>
          <Option value="JLPT">JLPT</Option>
          <Option value="Kaiwa">Kaiwa</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Duration"
        name="duration"
        rules={[
          {
            required: true,
            type: "number",
            message: "Please input a duration!",
          },
          //   {
          //     min: 0,
          //     message: "Duration should be greater than 0!",
          //   },
        ]}
      >
        <InputNumber
          addonAfter={<Form.Item noStyle>Month</Form.Item>}
          style={{ width: "20%" }}
        />
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
          //   {
          //     min: 0,
          //     message: "Price should be greater than 0!",
          //   },
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

export default AddCourseForm;
