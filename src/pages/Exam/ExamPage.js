import classNames from "classnames/bind";
import styles from "./ExamPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import Button from "~/components/Button/Button";
import ListQuestion from "~/components/ListQuestion/ListQuestion";
const cx = classNames.bind(styles);

function ExamPage() {
  return (
    <div className={cx("exam")}>
      <div className={cx("exam__header")}>
        <div className={cx("exam__header--left")}>
          <div className={cx("couter-time")}>00:00:00</div>
        </div>
        <div className={cx("exam__title")}>JLPTハフ模試　N3　</div>
        <div className={cx("exam__header--right")}></div>
      </div>
      <div className={cx("exam__content")}>
        <div className={cx("exam__content--left")}>
          <div className={cx("question")}>
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className={cx("question__icon")}
            />
            <div className={cx("question__number")}>
              Q 1 / <span>14</span>
            </div>
          </div>
          <div className={cx("question__title")}>
            問題１:＿のことばの読み方として最もよいものを、１・２・３・４からーつえらびなさい。
          </div>
          <div className={cx("question__content")}>
            姉は結婚後、仕事を止めて「主婦」になった。
          </div>
          <div className={cx("list-answer")}>
            <div className={cx("answer")}>
              <input type="radio" name="question1" />
              <div className={cx("answer__content")}>
                1.<span>しゅふ</span>
              </div>
            </div>
            <div className={cx("answer")}>
              <input type="radio" name="question1" />
              <div className={cx("answer__content")}>
                2.<span>しゅぶ</span>
              </div>
            </div>
            <div className={cx("answer")}>
              <input type="radio" name="question1" />
              <div className={cx("answer__content")}>
                3.<span>しゅうふ</span>
              </div>
            </div>
            <div className={cx("answer")}>
              <input type="radio" name="question1" />
              <div className={cx("answer__content")}>
                4.<span>しゅうぶ</span>
              </div>
            </div>
          </div>
          <div className={cx("button")}>
            <Button
              primary
              className={cx("button__prev")}
              leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            >
              Prev
            </Button>
            <Button
              primary
              className={cx("button__next")}
              rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
            >
              Next
            </Button>
            <Button outline className={cx("button__clear")}>
              Clear Selection
            </Button>
          </div>
        </div>
        <div className={cx("exam__content--right")}>
          <ListQuestion />
        </div>
      </div>
    </div>
  );
}

export default ExamPage;
