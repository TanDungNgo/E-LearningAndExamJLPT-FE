import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Progress,
  Switch,
  Upload,
  Space
} from "antd";
import { InboxOutlined, UploadOutlined, PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import examService from "~/services/examService";

const { Option } = Select;

const AddVocabularyFolderForm = () => {
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [form] = Form.useForm();
  const {createQuestion} = examService();

  const onFinish = async (values) => {
    const data = {
      ...values,
    }

    console.log(data);

    
    setProgress(100);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
        label="Type Question"
        name="type_question"
        rules={[{ required: true, message: "Please select a type question" }]}
      >
        <Select>
          <Option value="language_knowledge_questions">Language knowledge questions</Option>
          <Option value="listening_questions">Listening questions</Option>
          <Option value="reading_questions">Reading questions</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Text"
        name="text"
        rules={[{ required: true, message: "Please input a text!" }]}
      >
        <Input placeholder= "Question" />
      </Form.Item>
      
    <Form.List name="answers">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'option']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing option ',
                    },
                  ]}
                >
                  <Input placeholder="Option" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Answer
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item
      name="upload"
      label="Upload"
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>
    </Form.Item>

    <Form.Item label="Audio">
      <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
        <Upload.Dragger name="files" action="/upload.do">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Upload.Dragger>
      </Form.Item>
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
