import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import styles from "./GrammarCard.module.scss";
import { Link, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
function GrammarCard() {
  return (
    <div>
      <Link to={'/grammar'}>
      <a href="#" className={cx("card")}>
      <div className={cx("card__media")}>
        <img
          src="https://files.tofugu.com/articles/japanese/2022-09-30-japanese-learning-resources-fall-2022/header-5120x.jpg"
          className={cx("card__image")}
        />
      </div>
      <div className={cx("card__info")}>
        <div className={cx("card__topic")}>#GRAMMAR</div>
        <div className={cx("card__title")}>
          [Grammar N3] ～あいだ、あいだに
        </div>
        <div className={cx("card__more")}>
          <div className={cx("card__date")}>
            <FontAwesomeIcon icon={faCalendarDays} className={cx("card__date-icon")}/>
            <div className={cx("card__date-text")}>OCTOBER 25, 2023</div>
          </div>
          <div className={cx("card__author")}>
            <img
              src="https://upload.motgame.vn/photos/motgame-vn/2022/05/Spy-x-family-Anya_3.jpg"
              alt=""
              className={cx("card__author-image")}
            />
            <div className={cx("card__author-name")}>Anya</div>
          </div>
        </div>
      </div>
    </a>
      </Link>
    </div>
  );
}

export default GrammarCard;
