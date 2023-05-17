import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import styles from "./ArticleCard.module.scss";
import { Link, useParams } from 'react-router-dom';
const cx = classNames.bind(styles);
function ArticleCard() {
  return (
    <div>
      <Link to={'/article'}>
      <a href="#" className={cx("card")}>
      <div className={cx("card__media")}>
        <img
          src="/images/bgr-article.png"
          className={cx("card__image")}
        />
      </div>
      <div className={cx("card__info")}>
        <div className={cx("card__topic")}>#SERIES</div>
        <div className={cx("card__title")}>
          〜ている VS 〜てある VS 〜ておく: HOW ARE THEY DIFFERENT?
        </div>
        <div className={cx("card__description")}>
          EXPLORE THE DIFFERENCES BETWEEN THE THREE EXPRESSIONS THAT SOUND AND
          WORK SIMILAR
        </div>
        <div className={cx("card__more")}>
          <div className={cx("card__date")}>
            <FontAwesomeIcon icon={faCalendarDays} className={cx("card__date-icon")}/>
            <div className={cx("card__date-text")}>OCTOBER 25, 2022</div>
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

export default ArticleCard;
