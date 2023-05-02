import classNames from "classnames/bind";
import styles from "./Signup.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCalendar,
  faComment,
  faCommentAlt,
  faComments,
  faEnvelope,
  faPhone,
  faVoicemail,
} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button/Button";
import { Link } from "react-router-dom";
import routes from "~/config/routes";
import { useState } from "react";
import AuthService from "~/services/authService";
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
    register(userData);
  };
  return (
    <div className={cx("container")}>
      <div className={cx("signup-left")}>
        <div className={cx("title")}>Sign Up</div>
        <div className={cx("input-box__name")}>
          <div>
            <input
              type="text"
              placeholder="First name"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last name"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className={cx("input-radio-box")}>
          <span className={cx("details")}>Gender:</span>
          <input
            type="radio"
            name="gender"
            required
            value="Male"
            onChange={(e) => setGender(e.target.value)}
          />
          <span className={cx("details")}>Male</span>
          <input
            type="radio"
            name="gender"
            required
            value="Female"
            onChange={(e) => setGender(e.target.value)}
          />
          <span className={cx("details")}>Female</span>
        </div>
        <div className={cx("input-box")}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={cx("input-box")}>
          <input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={cx("input-box")}>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={cx("input-box")}>
          <input
            type="password"
            placeholder="Confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={cx("input-radio-box")}>
          <span className={cx("details")}>Type Account:</span>
          <input
            type="radio"
            name="role"
            value="Student"
            required
            onChange={(e) => setAccountType(e.target.value)}
          />
          <span className={cx("details")}>Student</span>
          <input
            type="radio"
            name="role"
            value="Teacher"
            required
            onChange={(e) => setAccountType(e.target.value)}
          />
          <span className={cx("details")}>Teacher</span>
        </div>
        <Button className={cx("btn_submit")} onClick={handleSignup}>
          Create
        </Button>
        <div className={cx("text")}>
          <span className={cx("text-detail")}>If you have account</span>
          <Link to={routes.signin}> LOG IN</Link>
        </div>
      </div>
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
