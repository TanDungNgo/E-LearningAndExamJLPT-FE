import classNames from "classnames/bind";
import styles from "./CreateCourse.module.scss";
import { Link } from "react-router-dom";
import routes from "~/configs/routes";
import { useState } from "react";
import { Button, Progress } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload, Image, InputNumber, Switch } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storageFirebase from "~/configs/firebaseConfig";
import courseService from "~/services/courseService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
const { Option } = Select;

const CreateCourse = () => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState("/images/banner_course.jpg");
  const [fileImage, setFileImage] = useState("");
  const { createCourse } = courseService();
  const [progress, setProgress] = useState(0);
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
        console.log(data);
        createCourse(data,"teacher");
      }
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={cx("container")}>
      {/* <img className={cx("bg-create")} src="/images/bg_create-course.png" /> */}
      <div className={cx("card-create")}>
        <div className={cx("card-create__header")}>
          {/* <label>
            <ArrowLeftOutlined />
            Back
          </label> */}
          <div className={cx("card-create__header-title")}>
            Create a new course
          </div>
        </div>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <div className={cx("card-create__content")}>
            <div className={cx("card-create__left")}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input a name!" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="description"
                rules={[
                  { required: true, message: "Please input a description!" },
                  {
                    max: 5000,
                    message: "Description should be less than 100 characters!",
                  },
                ]}
              >
                <Input.TextArea placeholder="Description" />
              </Form.Item>
              <Form.Item
                name="level"
                rules={[{ required: true, message: "Please select a level!" }]}
              >
                <Select placeholder="Level">
                  <Option value="N1">N1</Option>
                  <Option value="N2">N2</Option>
                  <Option value="N3">N3</Option>
                  <Option value="N4">N4</Option>
                  <Option value="N5">N5</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="type"
                rules={[{ required: true, message: "Please select a type!" }]}
              >
                <Select placeholder="Type">
                  <Option value="JLPT">JLPT</Option>
                  <Option value="Kaiwa">Kaiwa</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="duration"
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "Please input a duration!",
                  },
                  //   {
                  //     min: 0,
                  //     message: "Duration should be greater than 0!",
                  //   },
                ]}
              >
                <InputNumber
                  placeholder="Duration"
                  addonAfter={<Form.Item noStyle>Month</Form.Item>}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="price"
                rules={[
                  {
                    required: true,
                    type: "number",
                    message: "Please input a price!",
                  },
                  //   {
                  //     min: 0,
                  //     message: "Price should be greater than 0!",
                  //   },
                ]}
              >
                <InputNumber
                  placeholder="Price"
                  addonAfter={<Form.Item noStyle>$</Form.Item>}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className={cx("card-create__right")}>
              <img className={cx("card-create__banner")} src={imgSrc} />
              <div className={cx("card-create__import-file")}>
                <label htmlFor="file">
                  <UploadOutlined />
                  Choose a file
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className={cx("card-create__input-file")}
                  onChange={handleChangeFile}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          <div className={cx("form__submit")}>
            <Button
              type="primary"
              htmlType="submit"
              className={cx("btn__submit")}
            >
              Create
            </Button>
            <Progress percent={progress} style={{ marginLeft: "10px" }} />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateCourse;
