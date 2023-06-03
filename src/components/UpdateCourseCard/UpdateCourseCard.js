import classNames from "classnames/bind";
import Button from "../Button/Button";
import styles from "./UpdateCourseCard.module.scss";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { InputNumber} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "~/services/courseService";
const cx = classNames.bind(styles);

function UpdateCourseCard(props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("/images/banner_course.jpg");
  const [fileImage, setFileImage] = useState("");
  const navigate = useNavigate();

  const handleViewUpdate = () => {
    navigate(`/coursedetail/${props.course.id}`);
  }

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
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
      setLoading(true);
      setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className={cx("card")}>
      <div className={cx("card__header")}>
        <div className={cx("card__category")}>
          {props.course.type ? props.course.type : "JLPT"}
        </div>
        <img
          src={
            props.course.banner
              ? props.course.banner
              : "https://nhadepso.com/wp-content/uploads/2023/01/anh-anya_1.jpg"
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
        <Button
          primary
          className={cx("card__button")}
          onClick={showModal}
        >
          Update
        </Button>
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
        open={open}
        onCancel={handleCancel}
        onChange={handleViewUpdate}
        footer={[]}
      >
        <div className={cx("modal-header")}>
            <div className={cx("modal-header__title")}>Update My Course</div>
            {/* <FontAwesomeIcon icon={faClose} id="btn-close" className={cx("modal-header__icon")}/> */}
          </div>
          <div className={cx("modal-body")}>
            <div className={cx("modal-body__left")}>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input a name!" }]}
              >
                <Input 
                  placeholder="Name" 
                  defaultValue={props.course.name
                    ? props.course.name
                    : "Let's conquer JLPT N2 - Grammar & Reading"}
                />
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
                <Input.TextArea 
                  placeholder="Description" 
                  defaultValue={props.course.description
                    ? props.course.description
                    : "This is a JLPT N2 (Grammar and Reading) course for Vietnamese."}
                />
              </Form.Item>
              <Form.Item
                name="level"
                rules={[{ required: true, message: "Please select a level!" }]}
              >
                <Select placeholder="Level" defaultValue={props.course.level ? props.course.level : ""}>
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
                <Select placeholder="Type" defaultValue={props.course.type ? props.course.type : ""}>
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
                  defaultValue={props.course.duration ? props.course.duration : ""}
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
                  defaultValue={props.course.price ? props.course.price : ""}
                  addonAfter={<Form.Item noStyle>$</Form.Item>}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className={cx("modal-body__right")}>
              <img className={cx("modal-body__banner")} 
                src={props.course.banner
                ? props.course.banner
                : "https://nhadepso.com/wp-content/uploads/2023/01/anh-anya_1.jpg"}
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
      </Modal>
    </div>
  );
}

export default UpdateCourseCard;
