import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./PublicProfile.module.scss";
import React, { useEffect, useState } from "react";
import { Form, Image, Input } from "antd";
import { Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import usersService from "~/services/usersService";
import { useParams } from "react-router-dom";
import AuthService from "~/services/authService";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

function PublicProfile() {
  const { getCurrentUser } = AuthService();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [currentUser, setCurrentUser] = useState(null); 

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      getCurrentUser().then((res) => {
        setCurrentUser(res);
      });
    }
  }, []);

  console.log("[User] ", currentUser);

  const [form] = Form.useForm();

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        Gender: currentUser.gender,
        email: currentUser.email,
        avatar: currentUser.avatar,
      });
    }
  }, [form, currentUser]);

  const [fileImage, setFileImage] = useState("");
  const [imgSrc, setImgSrc] = useState(
    currentUser ? currentUser.avatar : "/images/Phuong.png"
  );

  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    setFileImage(file);
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png")
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };

  if (!currentUser) {
    return null; 
  }

  return (
    <div className={cx("card")}>
      <div className={cx("card__title")}>Public profile</div>
      <div className={cx("card__content")}>
        <div className={cx("card__avatar")}>
          <Image className={cx("card__avatar-img")} src={currentUser.avatar} />
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
          <Form form={form}>
            <div className={cx("card__info-name")}>
              <Form.Item
                name="firstname"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input
                  placeholder="First name"
                  defaultValue={currentUser.firstname}
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
                  defaultValue={currentUser.lastname}
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
                <Select placeholder="Gender" defaultValue={currentUser.gender}>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { type: "email", message: "The input is not a valid email!" },
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Email" defaultValue={currentUser.email} />
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
