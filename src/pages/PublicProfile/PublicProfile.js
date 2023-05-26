import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./PublicProfile.module.scss";
import React, { useState } from "react";
import { Form, Image, Input } from "antd";
import { Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
const cx = classNames.bind(styles);

function PublicProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [fileImage, setFileImage] = useState("");
  const [imgSrc, setImgSrc] = useState("/images/Phuong.png");
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
    <div className={cx("card")}>
      <div className={cx("card__title")}>Public profile</div>
      <div className={cx("card__content")}>
        <div className={cx("card__avatar")}>
          <Image className={cx("card__avatar-img")} src={imgSrc} />
          <div className={cx("card__btn")}>
            <div className={cx("card__btn-change")}>
              <Button primary>
                <label htmlFor="file">Change picture</label>
              </Button>
              <input
                type="file"
                name="file"
                id="file"
                className={cx("card-create__input-file")}
                onChange={handleChangeFile}
                accept="image/*"
              />
            </div>
            <Button outline className={cx("card__btn-delete")}>
              Delete picture
            </Button>
          </div>
        </div>
        <div className={cx("card__info")}>
          <Form>
            <div className={cx("card__info-name")}>
              <Form.Item
                name="firstname"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[
                  { required: true, message: "Please input your lastname!" },
                ]}
              >
                <Input
                  placeholder="Last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Item>
            </div>
            <div className={cx("card__info-detail")}>
              <Form.Item
                name="Gender"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please select your gender!",
                  },
                ]}
              >
                <Select placeholder="Gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { type: "email", message: "The input is not valid E-mail!" },
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
            </div>
            <div className={cx("card__info-btn")}>
              <Button primary>Save</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;
