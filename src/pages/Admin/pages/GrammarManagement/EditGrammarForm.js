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
import GrammarService from "~/services/grammarService";
import { useParams } from "react-router-dom";
const { Option } = Select;

const EditGrammarForm = () => {
  const { id } = useParams();
  const { getGrammarById, updateGrammar } = GrammarService();
  const [grammar, setGrammar] = useState({});

  const [form] = Form.useForm();
  useEffect(() => {
    const getGrammar = async () => {
      const grammarData = await getGrammarById(id);
      setGrammar(grammarData); // Lưu dữ liệu grammar vào state
      form.setFieldsValue({
        text: grammarData.text,
        explanation: grammarData.explanation,
        level: grammarData.level,
        means: grammarData.means,
        example: grammarData.example,
      });
    };
    getGrammar();
  }, []);

  const onFinish = async (values) => {
    // Gọi hàm updateGrammar với id và giá trị mới
    await updateGrammar(id, values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Text" name="text">
        <Input defaultValue={grammar.text} />
      </Form.Item>
      <Form.Item label="Explanation" name="explanation">
        <Input defaultValue={grammar.explanation} />
      </Form.Item>
      <Form.Item label="Means" name="means">
        <Input defaultValue={grammar.means} />
      </Form.Item>
      <Form.Item label="Example" name="example">
        <Input defaultValue={grammar.example} />
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

      <Form.Item
        label="Status"
        name="isPublic"
        valuePropName="checked"
        style={{ marginBottom: "15px" }}
        rules={[{ required: true, message: "Please select a status!" }]}
      >
        <Switch />
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

export default EditGrammarForm;
