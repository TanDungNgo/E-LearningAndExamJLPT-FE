import classNames from "classnames/bind";
import styles from "./Signup.module.scss";
import Button from "~/components/Button/Button";
import { Link } from "react-router-dom";
import routes from "~/configs/routes";
import { useState } from "react";
import AuthService from "~/services/authService";
import { Form, Input, Radio, Select } from "antd";
import { Option } from "antd/es/mentions";
const cx = classNames.bind(styles);

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const { register } = AuthService();
  const handleSelectChange = (value) => {
    setGender(value);
  };
  const handleSignup = () => {
    const userData = {
      firstname: firstName,
      lastname: lastName,
      gender: gender,
      email: email,
      username: username,
      password: password,
      roles: [accountType],
    };
    console.log(userData);
    register(userData);
  };
  return (
    <div className={cx("container")}>
      <Form>
        <div className={cx("signup-left")}>
          <div className={cx("title")}>Sign Up</div>
          <div className={cx("input-box__name")}>
            <Form.Item
              name="firstname"
              rules={[
                { required: true, message: "Please input your firstname!" },
              ]}
            >
              <Input
                placeholder="First name"
                required
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
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className={cx("input-radio-box")}>
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
              <Select placeholder="Gender" onChange={handleSelectChange}>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>
          </div>
          <div className={cx("input-box")}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className={cx("input-box")}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                placeholder="Username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className={cx("input-box")}>
            <Form.Item
              name="password"
              rules={[
                {
                  type: email,
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className={cx("input-box")}>
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
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
          </div>
          <div className={cx("input-radio-box")}>
            <Form.Item name="typeAccount" label="Type Account:">
              <Radio.Group>
                <Radio
                  value="Student"
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  Student
                </Radio>
                <Radio
                  value="Teacher"
                  onChange={(e) => setAccountType(e.target.value)}
                >
                  Teacher
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
          <Button className={cx("btn_submit")} onClick={handleSignup}>
            Create
          </Button>
          <div className={cx("text")}>
            <span className={cx("text-detail")}>If you have account</span>
            <Link to={routes.signin}> LOG IN</Link>
          </div>
        </div>
      </Form>
      <div className={cx("signup-right")}>
        <img
          className={cx("img-right")}
          src="https://img.freepik.com/premium-vector/group-happy-students-with-backpacks-books-their-hands-school-college-students-together_165429-1249.jpg"
        />
      </div>
    </div>
  );
}

export default Signup;