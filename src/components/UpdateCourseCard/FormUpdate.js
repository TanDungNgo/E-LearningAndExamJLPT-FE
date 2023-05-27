import classNames from "classnames/bind";
import styles from "./FormUpdate.module.scss";
import { InputNumber} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Form, Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Button from "../Button/Button";
const cx = classNames.bind(styles);

function FormUpdate() {
  const [imgSrc, setImgSrc] = useState("/images/banner_course.jpg");
  const [fileImage, setFileImage] = useState("");
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
  return (
    <div className={cx("modal-container")}>
        <div className={cx("modal")}>
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
            <div className={cx("modal-body__right")}>
              <img className={cx("modal-body__banner")} src={imgSrc}/>
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
          <Button primary >Update</Button>
        </div>  
    </div>
  );
};

export default FormUpdate;
