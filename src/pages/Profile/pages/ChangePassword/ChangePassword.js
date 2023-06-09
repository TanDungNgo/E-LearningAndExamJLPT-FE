import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import styles from "./ChangePassword.module.scss";
import React, { useState } from "react";
import AuthService from "~/services/authService";
import { Form, Input } from "antd";
const cx = classNames.bind(styles);

function ChangePassword() {
  const { changePassword } = AuthService();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const handleChangePassword = () => {
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    changePassword(data);
  };
  return (
    <div>
      <div className={cx("card")}>
        <Form onFinish={handleChangePassword}>
          <div className={cx("card__title")}>Change Password</div>
          <div className={cx("card__body")}>
            <Form.Item
              name="oldPassword"
              rules={[
                { required: true, message: "Please input your old password!" },
              ]}
            >
              <Input.Password
                placeholder="Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                onChange={(e) => setConfirm(e.target.value)}
              />
            </Form.Item>
            <div className={cx("card__btn")}>
              <Button
                primary
                className={cx("card__btn-change")}
              >
                Change
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
