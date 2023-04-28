import classNames from "classnames/bind";
import styles from "./ExamResult.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Progress } from "antd";

const cx = classNames.bind(styles);

function ExamResult() {
  return (
    <div className={cx("exam-result")}>
      <div className={cx("exam-result__header")}>
        <div className={cx("exam-image")}>
          <img src="/images/N3.png" alt="exam" />
        </div>
        <div className={cx("exam-info")}>
          <h2 className={cx("exam-info__title")}>JLPTハフ模試　N3　</h2>
          <div className={cx("exam-info__test-date")}>
            <FontAwesomeIcon icon={faCalendarDays} />
            <p>Test date: 24/4/2023</p>
          </div>
        </div>
      </div>
      <div className={cx("exam-result__table")}>
        <table>
          <tr>
            <th>Language knowledge(Characters / Vocabulary / Grammar)</th>
            <th>Reading comprehension</th>
            <th>Listening</th>
            <th>Overall Score (Passing Score：95 points)</th>
            <th>Score Percentage</th>
            <th>Status</th>
          </tr>
          <tr>
            <td>
              35 / <span>60</span>
            </td>
            <td>
              30 / <span>60</span>
            </td>
            <td>
              30 / <span>60</span>
            </td>
            <td>
              95 / <span>180</span>
            </td>
            <td>
              <Progress type="circle" percent={50} />
            </td>
            <td className={cx("status")}>Pass</td>
          </tr>
          <tr>
            <td colSpan="6">
              <div className={cx("info")}>
                <FontAwesomeIcon icon={faInfoCircle} />
                <p>95 points is the passing score for N3 level.</p>
              </div>
              <div className={cx("info")}>
                <FontAwesomeIcon icon={faInfoCircle} />
                <p>
                  If one of your scores is below it's corresponding
                  reference/passing point (N3: 19 points for language
                  knowledge・reading comprehension and listening comprehension)
                  you will not pass the examination, even if you obtained an
                  overall passing score.
                </p>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default ExamResult;
