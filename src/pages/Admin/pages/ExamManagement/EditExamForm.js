import React, { useEffect, useState } from "react";
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
import ExamService from "~/services/examService";
import { useParams } from "react-router-dom";
const { Option } = Select;

const EditExamForm = () => {
  const { id } = useParams();
  const { getExamById, updateExam } = ExamService();
  const [exam, setExam] = useState({});

  const [form] = Form.useForm();
  useEffect(() => {
    const getExam = async () => {
      const examData = await getExamById(id);
      setExam(examData); // Lưu dữ liệu grammar vào state
      form.setFieldsValue({
        name: examData.name,
        level: examData.level,
        price: examData.price,
      });
    };
    getExam();
  }, []);

  const onFinish = async (values) => {
    // Gọi hàm updateGrammar với id và giá trị mới
    await updateExam(id, values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Name" name="name">
        <Input defaultValue={exam.name} />
      </Form.Item>
      <Form.Item label="Level" name="level">
        <Select>
          <Option value=""></Option>
          <Option value="N1">N1</Option>
          <Option value="N2">N2</Option>
          <Option value="N3">N3</Option>
          <Option value="N4">N4</Option>
          <Option value="N5">N5</Option>
        </Select>
      </Form.Item>
     
      <Form.Item>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
         
        </div>
      </Form.Item>
    </Form>
  );
};

export default EditExamForm;
