import classNames from "classnames/bind";
import styles from "./EnrollCourse.module.scss";
import EnrollCard from "~/components/EnrollCard/EnrollCard";
const cx = classNames.bind(styles);
function EnrollCourse(props) {
  return (
    <div>
      <EnrollCard />
    </div>
  );
}

export default EnrollCourse;
