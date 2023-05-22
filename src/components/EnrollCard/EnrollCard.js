import classNames from "classnames/bind";
import Button from "../Button/Button";
import styles from "./EnrollCard.module.scss";
import {
  faChalkboardTeacher,
  faClock,
  faGraduationCap,
  faNotEqual,
  faNoteSticky,
  faNotesMedical,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNode } from "@fortawesome/free-brands-svg-icons";
const cx = classNames.bind(styles);
function EnrollCard(props) {
  return (
    <div className={cx("card")}>
      <div className={cx("card__header")}>
        <img
          src={props.course?.banner ? props.course?.banner : ""}
          alt={props.course?.name}
          className={cx("card__image")}
        />
      </div>
      <div className={cx("card__body")}>
        <Button outline className={cx("card__button")}>
          Enroll
        </Button>
      </div>
      <div className={cx("card__footer")}>
        <div className={cx("card__title")}>Information of course</div>
        <div className={cx("card__info")}>
          <div className={cx("card__info-details")}>
            <div style={{ display: "flex", gap: 12 }}>
              <FontAwesomeIcon icon={faUserTie} className={cx("icon__info")} />
              <p>Teacher: </p>
            </div>
            <div className={cx("card__detail-teacher")}>
              {props.course?.teacherName
                ? props.course?.teacherName
                : "Dung Mori"}
            </div>
          </div>
          <div className={cx("card__info-details")}>
            <div style={{ display: "flex", gap: 10 }}>
              <FontAwesomeIcon icon={faClock} className={cx("icon__info")} />
              <p>Duration: </p>
            </div>
            <div className={cx("card__detail-dur")}>
              {props.course?.duration} Months
            </div>
          </div>
          <div className={cx("card__info-details")}>
            <div style={{ display: "flex", gap: 10 }}>
              <FontAwesomeIcon
                icon={faNotesMedical}
                className={cx("icon__info")}
              />
              <p>Level: </p>
            </div>
            <div className={cx("card__detail-des")}>
              JLPT {props.course?.level}
            </div>
          </div>
          {/* <div className={cx("card__info-details")}>
            <div style={{ display: "flex", gap: 7 }}>
              <FontAwesomeIcon
                icon={faGraduationCap}
                className={cx("icon__info")}
              />
              <p>Object: </p>
            </div>
            <div className={cx("card__detail-study")}>
              Busy peoples, students...
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default EnrollCard;
