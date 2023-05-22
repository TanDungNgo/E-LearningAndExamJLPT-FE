import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames/bind";
import styles from "./ArticleCard.module.scss";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
const cx = classNames.bind(styles);
function ArticleCard(props) {
  console.log(props.article);
  return (
    <div>
      <Link to={`/article/${props?.article?.id}`} className={cx("card")}>
        <div className={cx("card__media")}>
          <img
            src={
              props?.article?.image
                ? props?.article?.image
                : "/images/bgr-article1.png"
            }
            className={cx("card__image")}
          />
        </div>
        <div className={cx("card__info")}>
          <div className={cx("card__topic")}>#SERIES</div>
          <div className={cx("card__title")}>
            {props?.article?.title
              ? props?.article?.title
              : "〜ている VS 〜てある VS 〜ておく: HOW ARE THEY DIFFERENT?"}
          </div>
          <div className={cx("card__description")}>
            {props?.article?.description
              ? props?.article?.description
              : "EXPLORE THE DIFFERENCES BETWEEN THE THREE EXPRESSIONS THAT SOUND AND WORK SIMILAR"}
          </div>
          <div className={cx("card__more")}>
            <div className={cx("card__date")}>
              <FontAwesomeIcon
                icon={faCalendarDays}
                className={cx("card__date-icon")}
              />
              <div className={cx("card__date-text")}>
                {props?.article?.createdDate
                  ? moment(props?.article?.createdDate).format("MMMM DD, YYYY")
                  : "OCTOBER 25, 2022"}
              </div>
            </div>
            <div className={cx("card__author")}>
              <img
                src={
                  props?.article?.avatarCreatedBy
                    ? props?.article?.avatarCreatedBy
                    : "https://upload.motgame.vn/photos/motgame-vn/2022/05/Spy-x-family-Anya_3.jpg"
                }
                alt={props?.article?.createdBy}
                className={cx("card__author-image")}
              />
              <div className={cx("card__author-name")}>
                {props?.article?.createdBy ? props?.article?.createdBy : "Anya"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ArticleCard;
