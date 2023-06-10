import { Button, Form, Modal, Progress, Rate, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined, UploadOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import lessonService from "~/services/lessonService";
import courseService from "~/services/courseService";
import { saveAs } from "file-saver";
import XLSX from 'xlsx/dist/xlsx.full.min';
import Swal from "sweetalert2";
import classNames from "classnames/bind";
import styles from "./ListLesson.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storageFirebase from "~/configs/firebaseConfig";
import { Option } from "antd/es/mentions";
const cx = classNames.bind(styles);

function ListLesson(props) {
  const navigate = useNavigate();
  const { idCourse, idLesson } = useParams();
  const { getCourseById, getMyCourse } = courseService();
  const { getLessonByCourse, getLessonById, createLesson, updateLesson, deleteLesson } = lessonService();
  const [lessonData, setLessonData] = useState([]);
  const [course, setCourse] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [fileVideo, setFileVideo] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openInsertModal, setOpenInsertModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [form] = Form.useForm();
  useEffect(() => {
    getLessonByCourse(idCourse).then((res) => {
      setLessonData(res);
    });
  }, []);
  useEffect(() => {
    getMyCourse().then((res) => {
      setCourseData(res);
    });
  }, []);
  useEffect(() => {
    getCourseById(idCourse).then((res) => {
      setCourse(res);
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
        setVideoSrc(e.target.result);
        setIsVideoUploaded(true);
      };
    }
  };
  const onFinishUpdate = async (values) => {
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
        updateLesson(idLesson, data, "teacher");
      }
    );
  };
  const onFinishInsert = async (values) => {
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
          course_id: idCourse,
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
  const handleCancel = () => {
    setOpenUpdateModal(false);
    setOpenInsertModal(false);
  };
  
  const handleShowUpdateModal = async (id) => {
    const lesson = await getLessonById(id);
    setVideoSrc(lesson.urlVideo);
    form.setFieldsValue({
      name: lesson.name,
      description: lesson.description,
    });
    setOpenUpdateModal(true);
  };
  const handleShowInsertModal = async () => {
    setOpenInsertModal(true);
  };
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  const filteredLessons = lessonData.filter((lesson) => {
    return lesson.name.toLowerCase().includes(searchText.toLowerCase());
  });
  const tableRef = useRef(null);
  const handlePageChange = (pageNumber) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleExport = () => {
    // Get the table data
    const dataSource = filteredLessons;
  
    // Prepare the worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataSource);
  
    // Prepare the workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
    // Convert the workbook to a binary string
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    // Create a Blob from the binary string
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  
    // Save the file
    saveAs(blob, "lesson_data.xlsx");
  };
  const handleDeleteLesson = (id, role) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLesson(id, "teacher").then((res) => {
          getLessonByCourse(idCourse).then((res) => {
            setLessonData(res);
          });
        });
      }
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => handleShowUpdateModal(id)}
            style={{ fontSize: "20px", marginLeft: "10px", color: "#0a9a41" }}
          />
          <DeleteOutlined
            onClick={() => handleDeleteLesson(id, "teacher")}
            style={{ fontSize: "20px", marginLeft: "10px", color: "#f40808" }}
          />
        </Space>
      ),
    },
  ];
  
  return (
    <div style={{minHeight: 350}}>
      <div style={{ marginBottom: 16, marginTop: 16 }}>
        <Input
          placeholder="Search by name"
          value={searchText}
          onChange={handleSearchTextChange}
          style={{ width: 200, marginRight: 16, marginLeft: 16 }}
        />
          <Button onClick={() => handleShowInsertModal()} type="primary" style={{ marginRight: 15 }} icon={<PlusOutlined />}>
            Add Lesson
          </Button>

        <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
          Export
        </Button>
      </div>
      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={filteredLessons}
          pagination={{ pageSize: 6, onChange: handlePageChange }}
        />
      </div>
      <Modal
        className={cx("modal")}
        open={openUpdateModal}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={cx("card-update__header")}>
          Update lesson
        </div>
        <Form 
          onFinish={onFinishUpdate} 
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <div className={cx("card-update__body")}>
            <div className={cx("card-update__input")}>
            <Form.Item
                name="course_id"
              >
                <Select placeholder="Choose a course" defaultValue={course.name} disabled>
                  {courseData.map((course) => (
                    <Option key={course.id} values={course.id}>
                      {course.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {/* <Form.Item
                name="course_name"
                rules={[{ required: true, message: "Please input a course!" }]}
              >
                <Select placeholder="Choose a course">
                  {courseData.map((course) => (
                    <Option key={course.id} values={course.id}>
                      {course.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item> */}
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
            <div className={cx("card-update__import-file")}>
                <label htmlFor="file">
                  <UploadOutlined />
                  Change URL
                </label>
                <input
                  type="file"
                  name="urlVideo"
                  id="file"
                  className={cx("card-update__input-file")}
                  onChange={handleChangeFile}
                  accept="video/*"
                />
                {isVideoUploaded && (
                  <div className={cx("card-update__message")}>
                    <FontAwesomeIcon icon={faCheck} style={{color: "#66c214", fontSize: "18px", padding: "7px"}}/>
                  </div>
                )}
            </div>
          </div>
          <div className={cx("form__submit")}>
            <Button primary
              type="primary"
              htmlType="submit"
              className={cx("btn__submit")}
            >
              Update
            </Button>
            <Progress percent={progress} style={{ marginLeft: "10px" }} />
          </div>
        </Form>
      </Modal>
      <Modal
        className={cx("modal")}
        open={openInsertModal}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={cx("card-update__header")}>
          Add lesson
        </div>
        <Form 
          onFinish={onFinishInsert} 
          onFinishFailed={onFinishFailed}
        >
          <div className={cx("card-update__body")}>
            <div className={cx("card-update__input")}>
              <Form.Item
                name="course_id"
              >
                <Select placeholder="Choose a course" defaultValue={course.name} disabled>
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
            <div className={cx("card-update__import-file")}>
                <label htmlFor="file">
                  <UploadOutlined />
                  Import URL
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className={cx("card-update__input-file")}
                  onChange={handleChangeFile}
                  accept="video/*"
                />
                {isVideoUploaded && (
                  <div className={cx("card-update__message")}>
                    <FontAwesomeIcon icon={faCheck} style={{color: "#66c214", fontSize: "18px", padding: "7px"}}/>
                  </div>
                )}
            </div>
          </div>
          <div className={cx("form__submit")}>
            <Button primary
              type="primary"
              htmlType="submit"
              className={cx("btn__submit")}
            >
              Add
            </Button>
            <Progress percent={progress} style={{ marginLeft: "10px" }} />
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default ListLesson;
