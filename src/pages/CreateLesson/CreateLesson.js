import classNames from "classnames/bind";
import styles from "./CreateLesson.module.scss";
import { Link } from "react-router-dom";
import routes from "~/configs/routes";
import { useState } from "react";
import { Button, Progress, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Select } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storageFirebase from "~/configs/firebaseConfig";
import courseService from "~/services/courseService";
const cx = classNames.bind(styles);
const { Option } = Select;
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
const CreateLesson = () => {
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
        createCourse(data);
      }
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={cx("container")}>
      <div className={cx("card-create")}>
        <div className={cx("card-create__header")}>
          Create a new lesson
        </div>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <div className={cx("card-create__body")}>
            <div className={cx("card-create__input")}>
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
                    max: 500,
                    message: "Description should be less than 100 characters!",
                  },
                ]}
              >
                <Input.TextArea placeholder="Description" />
              </Form.Item>
            </div>
            <div className={cx("card-create__import-file")}>
              <div className={cx("card-create__input")}>
                <Form.Item
                  name="urlVideo"
                  rules={[{ required: true, message: "Please input a URL!" }]}
                >
                  <Input placeholder="URL Video" />
                </Form.Item>
              </div>
                <label htmlFor="file">
                  <UploadOutlined />
                  Import URL
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

export default CreateLesson;
