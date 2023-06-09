import classNames from "classnames/bind";
import Button from "../../../../components/Button/Button";
import styles from "./UpdateCourseCard.module.scss";
import { Dropdown, Modal, Progress } from "antd";
import { useEffect, useState } from "react";
import { InputNumber} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { Link, useNavigate, useParams } from "react-router-dom";
import CourseService from "~/services/courseService";
import lessonService from "~/services/lessonService";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storageFirebase from "~/configs/firebaseConfig";
import { faCheck, faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from "~/configs/routes";
import Swal from "sweetalert2";
import { Colors } from "chart.js";
const cx = classNames.bind(styles);

function UpdateCourseCard(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getAllCourse, getCourseById, updateCourse, deleteCourse } = CourseService();
  const [courseData, setCourseData] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const [fileImage, setFileImage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [checkChangeImage, setCheckChangeImage] = useState(false);
  const [form] = Form.useForm();
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
  const handleShowModal = async () => {
    navigate(`/profileUser/updateCourse/${props.course.id}`);
    const course = await getCourseById(props.course.id);
    setImgSrc(course.banner);
      form.setFieldsValue({
        name: course.name,
        description: course.description,
        level: course.level,
        type: course.type,
        duration: course.duration,
        price: course.price,
      });
    setOpenModal(true);
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
          console.log(data);
          updateCourse(id, data, "teacher");
        }
      );
    } else {
      const data = {
        ...values,
        banner: imgSrc,
      };
      console.log(data);
      updateCourse(id, data, "teacher");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleDeleteCourse = (id, role) => {
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
        deleteCourse(id, role).then((res) => {
          getAllCourse().then((res) => {
            setCourseData(res);
          });
        });
      }
    });
  };
  const items = [
    {
      label: "Update information",
      key: "updateInfo",
    },
    {
      label: "Edit lesson",
      key: "updateLesson",
    },
    {
      label: "Delete course",
      key: "deleteCourse",
    },
  ];
  const handleMenuClick = (e) => {
    console.log("Clicked menu item:", e);
    const key = e.key;
    switch (key) {
      case "updateInfo":
        handleShowModal();
        break;
      case "updateLesson":
        navigate(`/profileUser/updateCourse/${props.course.id}/listLesson/:idLesson`);
        break;
      case "deleteCourse":
        handleDeleteCourse(props.course.id, "teacher");
        break;
      default:
        break;
    }
  };
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className={cx("card")}>
      <div className={cx("card__header")}>
        <div className={cx("card__category")}>
          {props.course.type ? props.course.type : "JLPT"}
        </div>
        <img
          src={props.course.banner
            ? props.course.banner
            : ""
          }
          alt=""
          className={cx("card__image")}
        />
      </div>
      <div className={cx("card__body")}>
        <div className={cx("card__title")}>
          {props.course.name
            ? props.course.name
            : "Let's conquer JLPT N2 - Grammar & Reading"}
        </div>
        <div className={cx("card__description")}>
          {props.course.description
            ? props.course.description
            : "This is a JLPT N2 (Grammar and Reading) course for Vietnamese."}
        </div>
      </div>
      <div className={cx("card__footer")}>
        <Dropdown menu={menuProps}>
          <Button
            primary
            className={cx("card__button")}
            // onClick={handleshowModal}
          >
            Update
          </Button>
        </Dropdown>
        <div className={cx("card__info")}>
          <div className={cx("card__author")}>
            <img
              src={
                props.course?.teacherAvatar
                  ? props.course?.teacherAvatar
                  : "https://upload.motgame.vn/photos/motgame-vn/2022/05/Spy-x-family-Anya_3.jpg"
              }
              alt=""
              className={cx("card__author-image")}
            />
            <div className={cx("card__author-name")}>
              {props.course?.teacherName}
            </div>
          </div>
          <div className={cx("card__rating")}>
            <div className={cx("card__rating-number")}>4.5</div>
            <div className={cx("card__rating-star")}>
              <svg width="10" height="10" viewBox="0 0 940.688 940.688">
                <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className={cx("modal")}
        open={openModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Form 
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className={cx("modal-header")}>
              <div className={cx("modal-header__title")}>Update My Course</div>
              {/* <FontAwesomeIcon icon={faClose} id="btn-close" className={cx("modal-header__icon")}/> */}
            </div>
            <div className={cx("modal-body")}>
              <div className={cx("modal-body__left")}>
                <Form.Item
                  name="name"
                  
                >
                  <Input/>
                </Form.Item>
                <Form.Item
                  name="description"
                >
                  <Input.TextArea 
                    placeholder="Description" 
                  />
                </Form.Item>
                <Form.Item
                  name="level"
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
                >
                  <Select placeholder="Type">
                    <Option value="JLPT">JLPT</Option>
                    <Option value="Kaiwa">Kaiwa</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="duration"
                >
                  <InputNumber
                    placeholder="Duration"
                    addonAfter={<Form.Item noStyle>Month</Form.Item>}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  name="price"
                >
                  <InputNumber
                    placeholder="Price"
                    addonAfter={<Form.Item noStyle>$</Form.Item>}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </div>
              <div className={cx("modal-body__right")}>
                <img className={cx("modal-body__banner")} 
                  src={imgSrc}
                />
                <div className={cx("modal-body__import-file")}>
                  <label htmlFor="file">
                    <UploadOutlined />
                    Choose a file
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className={cx("modal-body__input-file")}
                    onChange={handleChangeFile}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <div className={cx("btn-update")}>
              <Button primary >Update</Button>
            </div>
          </Form>
      </Modal>
    </div>
  );
}

export default UpdateCourseCard;
