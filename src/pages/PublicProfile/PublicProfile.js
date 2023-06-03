import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./PublicProfile.module.scss";
import React, { useEffect, useState } from "react";
import { Form, Image, Input, Modal } from "antd";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import AuthService from "~/services/authService";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

function PublicProfile() {
  const { getCurrentUser, updateProfile } = AuthService();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      getCurrentUser().then((res) => {
        setCurrentUser(res);
      });
    }
  }, []);

  const handleEditProfile = () => {
    setIsModalVisible(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAvatar(URL.createObjectURL(file));
  };

  const handleSaveProfile = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedUser = {
          ...currentUser,
          firstname: values.firstname,
          lastname: values.lastname,
          gender: values.Gender,
          email: values.email,
          avatar: avatar || currentUser.avatar,
        };

        updateProfile(updatedUser);
        console.log(updatedUser);
        // setIsModalVisible(false);
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        Gender: currentUser.gender,
        email: currentUser.email,
      });
      setAvatar(currentUser.avatar);
    }
  }, [form, currentUser]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className={cx("card")}>
      <div className={cx("card__title")}>Public profile</div>
      <div className={cx("card__content")}>
        <div className={cx("card__avatar")}>
          <Image className={cx("card__avatar-img")} src={avatar || currentUser.avatar} />
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
                accept="image/*"
                onChange={handleFileChange}
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
              <Form.Item name="firstname">
                <Input
                  placeholder="First name"
                  readOnly
                  defaultValue={currentUser.firstname}
                />
              </Form.Item>
              <Form.Item name="lastname">
                <Input
                  placeholder="Last name"
                  readOnly
                  defaultValue={currentUser.lastname}
                />
              </Form.Item>
            </div>
            <div className={cx("card__info-detail")}>
              <Form.Item name="Gender" hasFeedback>
                <Select placeholder="Gender" disabled defaultValue={currentUser.gender}></Select>
              </Form.Item>
              <Form.Item name="email">
                <Input
                  placeholder="Email"
                  readOnly
                  defaultValue={currentUser.email}
                />
              </Form.Item>
            </div>
            <div className={cx("card__info-btn")}>
              <Button primary onClick={handleEditProfile}>
                Edit Profile
              </Button>
            </div>
          </Form>
          <Modal
            title="Edit Profile"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            <Form form={form}>
              <div className={cx("card__info-name")}>
                <Form.Item
                  name="firstname"
                  rules={[
                    { required: true, message: "Please input your firstname!" },
                  ]}
                >
                  <Input placeholder="First name" defaultValue={currentUser.firstname} />
                </Form.Item>
                <Form.Item
                  name="lastname"
                  rules={[
                    { required: true, message: "Please input your lastname!" },
                  ]}
                >
                  <Input placeholder="Last name" defaultValue={currentUser.lastname} />
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
                <Button primary onClick={handleSaveProfile}>
                  Save
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;
