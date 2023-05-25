import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import styles from "./GrammarCard.module.scss";
import { Link, useParams } from 'react-router-dom';
import moment from "moment";
const cx = classNames.bind(styles);
function GrammarCard(props) {
  return (
    <div>
      <Link to={`/grammar/${props?.grammar?.id}`} className={cx("card")}>
        <div className={cx("card__media")}>
          <img
            src="https://files.tofugu.com/articles/japanese/2022-09-30-japanese-learning-resources-fall-2022/header-5120x.jpg"
            className={cx("card__image")}
          />
        </div>
        <div className={cx("card__info")}>
          <div className={cx("card__topic")}>#GRAMMAR</div>
          <div className={cx("card__title")}>
            [Grammar {props?.grammar?.level ? props?.grammar?.level : "N3"}] 
            {props?.grammar?.text ? props?.grammar?.text : "～あいだ、あいだに"}
          </div>
          <div className={cx("card__more")}>
            <div className={cx("card__date")}>
              <FontAwesomeIcon icon={faCalendarDays} className={cx("card__date-icon")}/>
              <div className={cx("card__date-text")}>
                {props?.grammar?.createdDate
                  ? moment(props?.grammar?.createdDate).format("MMMM DD, YYYY")
                  : "OCTOBER 25, 2023"
                }
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default GrammarCard;
