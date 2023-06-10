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
import vocabularyData from "~/data/vocabularyData";
const { Option } = Select;

const EditVocabularyForm = () => {
  const { id } = useParams();
  const { getVocabularyById, updateVocabulary } = VocabularyFolderService();
  const [vocabulary, setVocabulary] = useState({});

  const [form] = Form.useForm();
  useEffect(() => {
    const getVocabulary = async () => {
      const vocabulary = await getVocabularyById(id);
      setVocabulary(vocabulary); // Lưu dữ liệu grammar vào state
      form.setFieldsValue({
        audio: vocabulary.audio,
        example: vocabulary.example,
        meaning: vocabulary.meaning,
        pronunciation: vocabulary.pronunciation,
        spelling: vocabulary.spelling,
        text: vocabulary.text,
      });
    };
    getVocabulary();
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    const data = {
      ...values,
      vocabularyFolder_id: 2,
    }
    await updateVocabulary(id, data);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item label="Text" name="text">
        <Input defaultValue={vocabulary.text} />
      </Form.Item>
      <Form.Item label="Pronunciation" name="pronunciation">
        <Input defaultValue={vocabulary.pronunciation} />
      </Form.Item>
      <Form.Item label="Spelling" name="spelling">
        <Input defaultValue={vocabulary.spelling} />
      </Form.Item>
      <Form.Item label="Meaning" name="meaning">
        <Input defaultValue={vocabulary.meaning} />
      </Form.Item>
      <Form.Item label = "Example" name="example">
        <Input defaultValue={vocabulary.example}></Input>
      </Form.Item>
      <Form.Item label="Audio" name="audio">
        <Input defaultValue={vocabulary.audio} />
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

export default EditVocabularyForm;
