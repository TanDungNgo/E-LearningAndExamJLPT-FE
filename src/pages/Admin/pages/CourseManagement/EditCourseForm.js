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
import { UploadOutlined } from "@ant-design/icons";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storageFirebase from "~/configs/firebaseConfig";
import courseService from "~/services/courseService";
import { useParams } from "react-router-dom";
const { Option } = Select;

const EditCourseForm = () => {
  const { id } = useParams();
  const { getCourseById, updateCourse } = courseService();
  const [course, setCourse] = useState({});
  const [imgSrc, setImgSrc] = useState("");
  const [fileImage, setFileImage] = useState("");
  const { createCourse } = courseService();
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [checkChangeImage, setCheckChangeImage] = useState(false);
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
            banner: url,
          };
          // console.log(data);
          updateCourse(id, data, "admin");
        }
      );
    } else {
      const data = {
        ...values,
        banner: imgSrc,
      };
      // console.log(data);
      updateCourse(id, data, "admin");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();
  useEffect(() => {
    const getCourse = async () => {
      const course = await getCourseById(id);
      setImgSrc(course.banner);
      form.setFieldsValue({
        name: course.name,
        description: course.description,
        level: course.level,
        duration: course.duration,
        price: course.price,
        type: course.type,
        isPublic: true,
      });
    };
    getCourse();
  }, []);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
    >
      <Form.Item
        label="Name"
        name="name"
       
      >
        <Input defaultValue={course.name} />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
       
      >
        <Input.TextArea style={{ height: "180px" }} />
      </Form.Item>
      <Form.Item
        label="Level"
        name="level"
       
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
       
      >
        <InputNumber
          addonAfter={<Form.Item noStyle>Month</Form.Item>}
          style={{ width: "20%" }}
        />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
       
      >
        <InputNumber
          addonAfter={<Form.Item noStyle>$</Form.Item>}
          style={{ width: "20%" }}
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
      <Form.Item
        name="banner"
        // rules={[{ required: true, message: "Please upload a banner!" }]}
      >
        <div>
          <img src={imgSrc} />
          <div>
            <label
              htmlFor="file"
              style={{ color: "##b79032", cursor: "pointer", fontSize: "16px" }}
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
                with: "0.1px",
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

export default EditCourseForm;
