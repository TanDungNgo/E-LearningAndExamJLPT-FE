import classNames from "classnames/bind";
import styles from "./ExamResult.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Progress } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import examService from "~/services/examService";
import moment from "moment";

const cx = classNames.bind(styles);

function ExamResult() {
  const { submitExam } = examService();
  const answers = useSelector((state) => state.exam.answer);
  const examId = 1;
  const [examResult, setExamResult] = useState();
  useEffect(() => {
    const fetchExamResult = async () => {
      const res = await submitExam(examId, answers);
      setExamResult(res);
    };
    fetchExamResult();
  }, []);

  return (
    <div className={cx("exam-result")}>
      <div className={cx("exam-result__header")}>
        <div className={cx("exam-image")}>
          <img src="/images/N3.png" alt="exam" />
        </div>
        <div className={cx("exam-info")}>
          <h2 className={cx("exam-info__title")}>{examResult?.examName}</h2>
          <div className={cx("exam-info__test-date")}>
            <FontAwesomeIcon icon={faCalendarDays} />
            <p>
              Test date: {moment(examResult?.examDate).format("MMMM DD, YYYY")}
            </p>
          </div>
        </div>
      </div>
      <div className={cx("exam-result__table")}>
        <table>
          <tbody>
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
                {examResult?.correctAnswerLanguageKnowledgeQuestion} /
                <span>{examResult?.totalLanguageKnowledgeQuestion}</span>
              </td>
              <td>
                {examResult?.correctAnswerReadingQuestion} /
                <span>{examResult?.totalReadingQuestion}</span>
              </td>
              <td>
                {examResult?.correctAnswerListeningQuestion} /
                <span>{examResult?.totalListeningQuestion}</span>
              </td>
              <td>
                {examResult?.correctAnswer} /
                <span>{examResult?.totalQuestion}</span>
              </td>
              <td>
                <Progress
                  type="circle"
                  size="medium"
                  percent={examResult?.percentage}
                />
              </td>
              <td className={cx("status")}>{examResult?.status}</td>
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
                    knowledge・reading comprehension and listening
                    comprehension) you will not pass the examination, even if
                    you obtained an overall passing score.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExamResult;
