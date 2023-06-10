import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const { Option } = Select;

const AddVocabularyFolderForm = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [form] = Form.useForm();
  const {createQuestion} = examService();
  const onFinish = async (values) => {
    const convertedArray = values.answers.map((item) => item.option);
    const data = {
      examId: id,
      ...values,
      answers: convertedArray,
    }
    console.log(data);
    setProgress(100);
    createQuestion(data, id);

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
        name="type"
        rules={[{ required: true, message: "Please select a type question" }]}
      >
        <Select>
          <Option value="0">Language knowledge questions</Option>
          <Option value="1">Reading questions</Option>
          <Option value="2"> Listening questions</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Text"
        name="text"
        rules={[{ required: true, message: "Please input a text!" }]}
      >
        <Input placeholder= "Question" />
      </Form.Item>
      <Form.Item label="Answer"> 
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
      </Form.Item> 
      <Form.Item
        label="Correct Answer"
        name="correctAnswer"
        rules={[{ required: true, message: "Please input a correct answer!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Explanation"
        name="explanation"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="image"
        label="Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Audio" name="audioFile">
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

export default AddVocabularyFolderForm;
