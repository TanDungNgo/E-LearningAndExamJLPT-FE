import classNames from "classnames/bind";
import styles from "./CreateLesson.module.scss";
import { Link } from "react-router-dom";
import routes from "~/configs/routes";
import { useEffect, useState } from "react";
import { Button, Progress, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Select } from "antd";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storageFirebase from "~/configs/firebaseConfig";
import lessonService from "~/services/lessonService";
import courseService from "~/services/courseService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
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
  const [videoSrc, setVideoSrc] = useState("");
  const [fileVideo, setFileVideo] = useState("");
  const { createLesson } = lessonService();
  const [progress, setProgress] = useState(0);
  const { getMyCourse } = courseService();
  const [courseData, setCourseData] = useState([]);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  useEffect(() => {
    getMyCourse().then((res) => {
      setCourseData(res);
    });
  }, []);
  const handleChangeFile = (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    setFileVideo(file);
    if (
      file.type === "video/mp4" ||
      file.type === "video/mov" ||
      file.type === "video/avi"
    ) {
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        //console.log(e.target.result);
        setVideoSrc(e.target.result);
        setIsVideoUploaded(true);
      };
    }
  };
  const onFinish = async (values) => {
    const storageRef = ref(storageFirebase, `videos/${fileVideo.name}`);
    const uploadTask = uploadBytesResumable(storageRef, fileVideo);
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
          urlVideo: url,
        };
        console.log(data);
        createLesson(data, "teacher");
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
                name="course_id"
                rules={[{ required: true, message: "Please input a course!" }]}
              >
                <Select placeholder="Choose a course">
                  {courseData.map((course) => (
                    <Option key={course.id} values={course.id}>
                      {course.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input a name!" }]}
              >
                <Input placeholder="Name Lesson" />
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
                <label htmlFor="file">
                  <UploadOutlined />
                  Import URL
                </label>
                <input
                  type="file"
                  name="urlVideo"
                  id="file"
                  className={cx("card-create__input-file")}
                  onChange={handleChangeFile}
                  accept="video/*"
                />
                {isVideoUploaded && (
                  <div className={cx("card-create__message")}>
                    <FontAwesomeIcon icon={faCheck} style={{color: "#66c214", fontSize: "18px", padding: "7px"}}/>
                  </div>
                )}
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
