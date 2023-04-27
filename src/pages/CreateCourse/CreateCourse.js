import classNames from "classnames/bind";
import styles from "./CreateCourse.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button/Button";
import { Link } from "react-router-dom";
import routes from "~/config/routes";
const cx = classNames.bind(styles);

function CreateCourse(){
  return (
    <div className={cx("container")}>
        <img className={cx("bg-create")} src="/images/bg_create-course.png"/>
        <div className={cx("card-create")}>
            
            <div className={cx("card-create__left")}>
                <div className={cx("card-create__title")}>Create a new course</div>
                <div className="card-create__detail">
                    <input type="text" placeholder="Course Name" required/>
                </div>
                <div className={cx("card-create__select")}>
                    <select>
                        <option selected disabled>Level</option>
                        <option value="">N5</option>
                        <option value="">N4</option>
                        <option value="">N3</option>
                    </select>
                </div>
                <div className="card-create__detail">
                    <input type="text" placeholder="Description" required/>
                </div>
                <div className="card-create__detail">
                    <input type="text" placeholder="Duration" required/>
                </div>
                <div className="card-create__detail">
                    <input type="text" placeholder="Price" required/>
                </div>
                <Button className={cx("card-create__btn")}>Create</Button>
            </div>

            <div className={cx("card-create__right")}>
                <div className={cx("card-create-banner")}>
                    <img 
                    className={cx("card-create-banner__img")}
                    src="/images/banner_course.jpg"/>
                </div>
                <input type="file" className={cx("card-create__input-file")}/>
            </div>
        </div>
    </div>
  );
}

export default CreateCourse