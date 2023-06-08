import classNames from "classnames/bind";
import styles from "./AddLessonForm.module.scss";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Image,
  Progress,
  Switch,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import courseService from "~/services/courseService";
import lessonService from "~/services/lessonService";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storageFirebase from "~/configs/firebaseConfig";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles);
const { Option } = Select;

const EditLessonForm = ({ onSubmit }) => {
  const { id } = useParams();
  const { getAllCourse, getCourseById } = courseService();
  const { getLessonById, updateLesson } = lessonService();
  const [courseData, setCourseData] = useState([]);
  const [videoSrc, setVideoSrc] = useState("");
  const [fileVideo, setFileVideo] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [checkChangeVideo, setCheckChangeVideo] = useState(false);
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
        setCheckChangeVideo(true);
      };
    }
  };
  const onFinish = (values) => {
    if (checkChangeVideo) {
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
                updateLesson(id, data, "admin");
            }
        );
    } else {
        const data = {
            ...values,
            urlVideo: videoSrc,
        };
        console.log(data);
        updateLesson(id, data, "admin");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleBeforeUpload = (file) => {
    setFile(file);
    return false;
  };
  useEffect(() => {
    getAllCourse().then((res) => {
      setCourseData(res);
    });
  }, []);
  const [form] = Form.useForm();
  useEffect(() => {
    const getLesson = async () => {
      const lesson = await getLessonById(id);
      setVideoSrc(lesson.urlVideo);
      form.setFieldsValue({
        name: lesson.name,
        description: lesson.description,
        isPublic: true,
      });
    };
    getLesson();
  }, []);
  return (
    <Form 
        form={form}
        onFinish={onFinish} 
        onFinishFailed={onFinishFailed} 
        layout="vertical"
    >
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
            max: 100,
            message: "Description should be less than 100 characters!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label = "Link Video"
        name= "urlVideo"
        rules={[
          {required: true}
        ]}
      >
        <div className={cx("card-create__import-file")}>
          <label htmlFor="file">
            <UploadOutlined />
            Change URL
          </label>
          <input
            type="file"
            name="urlVideo"
            id="file"
            className={cx("card-create__input-file")}
            onChange={handleChangeFile}
            accept="video/*"
          />
          {checkChangeVideo && (
            <div className={cx("card-create__message")}>
              <FontAwesomeIcon icon={faCheck} style={{color: "#66c214", fontSize: "18px", padding: "7px"}}/>
            </div>
          )}
        </div>
      </Form.Item>
      <Form.Item
        label="Status"
        valuePropName="checked"
        rules={[{ required: true, message: "Please select a status!" }]}
      >
        <Switch />
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

export default EditLessonForm;
