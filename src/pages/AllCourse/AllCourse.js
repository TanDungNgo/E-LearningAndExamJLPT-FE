import classNames from "classnames/bind";
import styles from "./AllCourse.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button/Button";
import Header from "~/layouts/components/Header/Header";
import Footer from "~/layouts/components/Footer/Footer";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CourseCard from "~/components/CourseCard/CourseCard";
import EnrollCard from "~/components/EnrollCard/EnrollCard";
const cx = classNames.bind(styles);

function AllCourse(){
  return (
    <div className={cx("container")}>
        <div className={cx("card-img")}>
            <img 
                className={cx("card-img__detail")}
                src="/images/bg_allcourse.jpg"
                >
            </img>
        </div>
        <div className={cx("card-search")}>
            <input type="text" placeholder="Confirm password" required/>
            <Button className={cx("btn-search")}>Search</Button>
        </div>
        <div className={cx("card-select")}>
            <select className={cx("card-select__level")}>
                <option value="">N5</option>
                <option value="">N4</option>
                <option value="">N3</option>
            </select>
            <select className={cx("card-select__learning")}>
                <option value="">Kaiwa</option>
                <option value="">Grammar</option>
                <option value="">Kanji</option>
                <option value="">vocabulary</option>
                <option value="">Listening</option>
            </select>
        </div>
        <div className={cx("card-listcourse")}>
            
        </div>
    </div>
  );
}

export default AllCourse