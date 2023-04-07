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
    <>
      <div className={cx("card")}>
        <div className={cx("card__header")}>
          <img
            src="https://scontent.fhan5-9.fna.fbcdn.net/v/t1.15752-9/339923067_584554696969140_5225590373694856946_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=BtB3ewZBmTUAX-ypsIf&_nc_ht=scontent.fhan5-9.fna&oh=03_AdT1DOgpt7FsdZwdUSrxG7lIF_a71X63FjSUMUAZwh0FgQ&oe=64571677"
            alt=""
            className={cx("card__image")}
          />
        </div>
        <div className={cx("card__body")}>
          <Button primary className={cx("card__button")}>
            {" "}
            Enroll{" "}
          </Button>
        </div>
        <div className={cx("card__footer")}>
          <div className={cx("card__title")}>Information of course</div>
          <div className={cx("card__info")}>
            <div className={cx("card__info-details")}>
              <div style={{display: 'flex', gap: 12}}>
                <FontAwesomeIcon
                  icon={faUserTie}
                  className={cx("icon__info")}
                />
                <p>Teacher: </p>
              </div>
              <div className={cx("card__detail-teacher")}> 
                Dung Mori 
              </div>
            </div>
            <div className={cx("card__info-details")}>
              <div style={{display: 'flex', gap: 10}}>
                <FontAwesomeIcon
                  icon={faClock}
                  className={cx("icon__info")}
                />
                <p>Duration: </p>
              </div>
              <div className={cx("card__detail-dur")}> 
                3 Months 
              </div>
            </div>
            <div className={cx("card__info-details")}>
              <div style={{display: 'flex', gap: 10}}>
                <FontAwesomeIcon
                  icon={faNotesMedical}
                  className={cx("icon__info")}
                />
                <p>Description: </p>
              </div>
              <div className={cx("card__detail-des")}> 
                JLPT N3 
              </div>
            </div>
            <div className={cx("card__info-details")}>
              <div style={{display: 'flex', gap: 7}}>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className={cx("icon__info")}
                />
                <p>Object: </p>
              </div>
              <div className={cx("card__detail-study")}>
                Busy peoples, students...
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnrollCard;
