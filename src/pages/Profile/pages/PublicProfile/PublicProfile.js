import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./PublicProfile.module.scss";
import React, { useEffect, useState } from "react";
import { Form, Image, Input, Modal } from "antd";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import AuthService from "~/services/authService";
import { useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storageFirebase from "~/configs/firebaseConfig";

const cx = classNames.bind(styles);

function PublicProfile() {
  const { getCurrentUser, updateProfile } = AuthService();
  const [currentUser, setCurrentUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [newAvatar, setNewAvatar] = useState(null);
  const [fileImage, setFileImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [deleteAvatar, setDeleteAvatar] = useState(false);
  const user = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      getCurrentUser().then((res) => {
        setCurrentUser(res);
      });
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      form.setFieldsValue({
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        Gender: currentUser.gender,
        email: currentUser.email,
      });
      setNewAvatar(currentUser.avatar);
    }
  }, [form, currentUser]);

  if (!currentUser) {
    return null;
  }

  const handleEditProfile = () => {
    setIsModalVisible(true);
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    setFileImage(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setNewAvatar(e.target.result);
    };
  };


  const handleSaveProfile = () => {
    if (deleteAvatar) {
      form.validateFields().then((values) => {
        const data = {
          ...values,
          avatar: null,
        };
        console.log(data);
        updateProfile(data);
      });
    } else if (fileImage) {
      const storageRef = ref(storageFirebase, `images/${fileImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          form.validateFields().then((values) => {
            const data = {
              ...values,
              avatar: url,
            };
            console.log("Change Avatar: ",data);
            updateProfile(data);
            setIsModalVisible(false);
          });
        }
      );
    } else {
      form
        .validateFields()
        .then((values) => {
          const updatedUser = {
            firstname: values.firstname,
            lastname: values.lastname,
            gender: values.Gender,
            email: values.email,
            avatar: deleteAvatar ? null : newAvatar || currentUser.avatar,
          };

          console.log(updatedUser);
          updateProfile(updatedUser);
          setIsModalVisible(false);
        })
        .catch((error) => {
          console.log("Validation failed:", error);
        });
    }
  };
  return (
    <div className={cx("card")}>
      <div className={cx("card__title")}>Public profile</div>
      <div className={cx("card__content")}>
        <div className={cx("card__avatar")}>
          <Image
            className={cx("card__avatar-img")}
            src={newAvatar || currentUser.avatar}
          />
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
            <Button
              outline
              className={cx("card__btn-delete")}
              onClick={() => setDeleteAvatar(true)}
            >
              Delete picture
            </Button>
          </div>
        </div>
        <div className={cx("card__info")}>
          <Form form={form}>
            <div className={cx("card__info-name")}>
              <Form.Item name="firstname">
                <Input placeholder="First name" readOnly />
              </Form.Item>
              <Form.Item name="lastname">
                <Input placeholder="Last name" readOnly />
              </Form.Item>
            </div>
            <div className={cx("card__info-detail")}>
              <Form.Item name="Gender" hasFeedback>
                <Select placeholder="Gender" disabled></Select>
              </Form.Item>
              <Form.Item name="email">
                <Input placeholder="Email" readOnly />
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
            open={isModalVisible}
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
                  <Input placeholder="First name" />
                </Form.Item>
                <Form.Item
                  name="lastname"
                  rules={[
                    { required: true, message: "Please input your lastname!" },
                  ]}
                >
                  <Input placeholder="Last name" />
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
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </div>
              <div className={cx("card__info-btn")}>
                <Button primary onClick={handleSaveProfile}>
                  Save Profile
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
