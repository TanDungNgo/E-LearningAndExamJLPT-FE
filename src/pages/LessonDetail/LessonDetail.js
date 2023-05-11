import classNames from "classnames/bind";
import styles from "./LessonDetail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function LessonDetail() {
    return (
        <div>
            <div className={cx("nav-learning")}>
                <div className={cx("navigation")}>
                    <div className={cx("back-btn")}>
                        <FontAwesomeIcon icon={faAngleLeft} className={cx("faAngleLeft")}></FontAwesomeIcon>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LessonDetail;