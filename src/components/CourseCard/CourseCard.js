import classNames from "classnames/bind";
import Button from "../Button/Button";
import styles from "./CourseCard.module.scss";
import routes from "~/configs/routes";
import { Link, useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);
function CourseCard(props) {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/coursedetail/${props.course.id}`);
  }
  return (
    <div className={cx("card")}>
      <div className={cx("card__header")}>
        <div className={cx("card__category")}>
          {props.course.type ? props.course.type : "JLPT"}
        </div>
        <img
          src={
            props.course.banner
              ? props.course.banner
              : "https://nhadepso.com/wp-content/uploads/2023/01/anh-anya_1.jpg"
          }
          alt=""
          className={cx("card__image")}
        />
      </div>
      <div className={cx("card__body")}>
        <div className={cx("card__title")}>
          {props.course.name
            ? props.course.name
            : "Let's conquer JLPT N2 - Grammar & Reading"}
        </div>
        <div className={cx("card__description")}>
          {props.course.description
            ? props.course.description
            : "This is a JLPT N2 (Grammar and Reading) course for Vietnamese."}
        </div>
      </div>
      <div className={cx("card__footer")}>
        <Button
          primary
          className={cx("card__button")}
          onClick={handleViewDetail}
        >
          View details
        </Button>
        <div className={cx("card__info")}>
          <div className={cx("card__author")}>
            <img
              src={
                props.course?.teacherAvatar
                  ? props.course?.teacherAvatar
                  : "https://upload.motgame.vn/photos/motgame-vn/2022/05/Spy-x-family-Anya_3.jpg"
              }
              alt=""
              className={cx("card__author-image")}
            />
            <div className={cx("card__author-name")}>
              {props.course?.teacherName}
            </div>
          </div>
          <div className={cx("card__rating")}>
            <div className={cx("card__rating-number")}>4.5</div>
            <div className={cx("card__rating-star")}>
              <svg width="10" height="10" viewBox="0 0 940.688 940.688">
                <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
