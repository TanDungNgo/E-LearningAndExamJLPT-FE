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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storageFirebase from "~/configs/firebaseConfig";
import courseService from "~/services/courseService";
const { Option } = Select;

const AddCourseForm = ({ onSubmit }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [fileImage, setFileImage] = useState("");
  const { createCourse } = courseService();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const handleChangeFile = (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    setFileImage(file);
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // console.log(e.target.result);
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
          banner: url,
        };
        // console.log(data);
        createCourse(data, "admin");
      }
    );
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
        <Input.TextArea />
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
        label="Type"
        name="type"
        rules={[{ required: true, message: "Please select a type!" }]}
      >
        <Select>
          <Option value=""></Option>
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
        style={{ marginBottom: "15px" }}
        rules={[{ required: true, message: "Please select a status!" }]}
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name="banner"
        // rules={[{ required: true, message: "Please upload a banner!" }]}
      >
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
  );
};

export default AddCourseForm;
