import React, { useEffect, useState } from "react";
import { Form, Input, Switch, Button, Progress } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storageFirebase from "~/configs/firebaseConfig";
import ArticlesService from "~/services/articlesService";
import { useParams } from "react-router-dom";
import TextEditor from "../../components/Editor/TextEditor";
import { EditorState, ContentState } from "draft-js";

const EditArticleForm = () => {
  const { id } = useParams();
  const { getArticleById, updateArticle } = ArticlesService();
  const [article, setArticle] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const [fileImage, setFileImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [checkChangeImage, setCheckChangeImage] = useState(false);
  const [contentEditorState, setContentEditorState] = useState(null);
  const [descriptionEditorState, setDescriptionEditorState] = useState(null);

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    setFileImage(file);
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
        setCheckChangeImage(true);
      };
    }
  };

  const onFinish = async (values) => {
    if (checkChangeImage) {
      const storageRef = ref(storageFirebase, `images/${fileImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const data = {
            ...values,
            image: url,
            content: contentEditorState.getCurrentContent().getPlainText(),
            description: descriptionEditorState.getCurrentContent().getPlainText(),
          };
          console.log(data);
          updateArticle(id, data);
        }
      );
    } else {
      const data = {
        ...values,
        image: imgSrc,
        content: contentEditorState.getCurrentContent().getPlainText(),
        description: descriptionEditorState.getCurrentContent().getPlainText(),
      };
      console.log(data);
      updateArticle(id, data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    const getArticle = async () => {
      const article = await getArticleById(id);
      setImgSrc(article.image);
      setArticle(article);
      setContentEditorState(
        EditorState.createWithContent(ContentState.createFromText(article.content))
      );
      setDescriptionEditorState(
        EditorState.createWithContent(ContentState.createFromText(article.description))
      );
      form.setFieldsValue({
        title: article.title,
        description: article.description,
        content: article.content,
      });
    };

    getArticle();
  }, []);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input a title!" }]}
      >
        <Input defaultValue={article.title} />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input a description!" },
          {
            max: 500,
            message: "Description should be less than 100 characters!",
          },
        ]}
      >
        <TextEditor
          defaultValue={article.description}
          onEditorStateChange={setDescriptionEditorState}
        />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[
          { required: true, message: "Please input a content!" },
          {
            max: 5000,
            message: "Content should be less than 5000 characters!",
          },
        ]}
      >
        <TextEditor
          defaultValue={article.content}
          onEditorStateChange={setContentEditorState}
        />
      </Form.Item>
      <Form.Item
        label="Status"
        name="isPublic"
        valuePropName="checked"
        style={{ marginBottom: "15px" }}
      >
        <Switch />
      </Form.Item>
      <Form.Item name="image">
        <div>
          <img src={imgSrc} alt="Article" />
          <div>
            <label
              htmlFor="file"
              style={{ color: "#b79032", cursor: "pointer", fontSize: "16px" }}
            >
              <UploadOutlined />
              Upload Image
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleChangeFile}
              accept="image/*"
              style={{
                width: "0.1px",
                height: "0.1px",
                opacity: "0",
                overflow: "hidden",
                position: "absolute",
              }}
            />
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
          <Progress percent={progress} style={{ marginLeft: "10px" }} />
        </div>
      </Form.Item>
    </Form>
  );
};

export default EditArticleForm;
