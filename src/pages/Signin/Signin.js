import classNames from "classnames/bind";
import Button from "~/components/Button/Button";
import CourseCard from "~/components/CourseCard/CourseCard";
import styles from "./Signin.module.scss";
const cx = classNames.bind(styles);
function Signin() {
  return (
    <div>
      <CourseCard/>
    </div>
  );
}

export default Signin;
