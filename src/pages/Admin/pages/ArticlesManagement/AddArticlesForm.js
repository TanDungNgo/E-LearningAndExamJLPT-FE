import React, { useState } from "react";
import { Form, Input, Switch, DatePicker, Button, Upload, Image, Progress } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import articlesService from "~/services/articlesService";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storageFirebase from "~/configs/firebaseConfig";
import { hover } from "@testing-library/user-event/dist/hover";
import TextEditor from "../../components/Editor/TextEditor";

const { TextArea } = Input;

const AddArticlesForm = ({ onSubmit }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [fileImage, setFileImage] = useState("");
  const { createArticle } = articlesService();

  const handleBeforeUpload = (file) => {
    setFile(file);
    return false;
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png")) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };
  const onFinish = async (values) => {
    const storageRef = ref(storageFirebase, `images/${fileImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, fileImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
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
        };
        console.log(data);
        // createArticle(data);
      }
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input a description!" }]}
      >
        <TextEditor />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please input a content!" }]}
      >
        <TextEditor />
      </Form.Item>
      <Form.Item
        label="Date Submitted"
        name="date_submitted"
        rules={[{ required: true, message: "Please select a date submitted!" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Status"
        valuePropName="checked"
        style={{ marginBottom: "15px" }}
        rules={[{ required: true, message: "Please select a status!" }]}
      >
        <Switch />
      </Form.Item>
      <Form.Item>
        <div>
          <img src={imgSrc} />
          <div>
            <label htmlFor="file" style={{ color: "##b79032", cursor: "pointer", fontSize: "16px" }}>
              <UploadOutlined />
              Upload Image

            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleChangeFile}
              accept="image/*"
              style={{ with: "0.1px", height: "0.1px", opacity: "0", overflow: "hidden", position: "absolute" }}
            />
          </div>

        </div>

      </Form.Item>
      <Form.Item>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Progress percent={progress} style={{ marginLeft: "10px" }} />
        </div>
      </Form.Item>

    </Form>
  )
}
export default AddArticlesForm;    