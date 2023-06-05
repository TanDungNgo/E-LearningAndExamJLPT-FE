import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Switch,
} from "antd";
import VocabularyFolderService from "~/services/vocabularyFolderService";
import { useParams } from "react-router-dom";
import vocabularyFolderData from "~/data/vocabularyFolderData";
const { Option } = Select;

const EditVocabularyFolderForm = () => {
  const { id } = useParams();
  const { getVocabularyFolderById, updateVocabularyFolder } = VocabularyFolderService();
  const [vocabularyFolder, setVocabularyFolder] = useState({});

  const [form] = Form.useForm();
  useEffect(() => {
    const getVocabularyFolder = async () => {
      const vocabularyFolder = await getVocabularyFolderById(id);
      setVocabularyFolder(vocabularyFolder); // Lưu dữ liệu grammar vào state
      form.setFieldsValue({
        title: vocabularyFolder.title,
        level: vocabularyFolder.level,

      });
    };
    getVocabularyFolder();
  }, []);

  const onFinish = async (values) => {
    // Gọi hàm updateGrammar với id và giá trị mới
    await updateVocabularyFolder(id, values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Title" name="title">
        <Input defaultValue={vocabularyFolder.title} />
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

export default EditVocabularyFolderForm;
