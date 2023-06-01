import classNames from "classnames/bind";
import styles from "./ExamResult.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCheck,
  faInfoCircle,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Progress } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import examService from "~/services/examService";
import moment from "moment";
import { Link } from "react-router-dom";
import { HomeOutlined, RollbackOutlined } from "@ant-design/icons";
import routes from "~/configs/routes";
import { resetAnswers } from "~/redux/examSlice";

const cx = classNames.bind(styles);

function ExamResult() {
  const { submitExam } = examService();
  const answers = useSelector((state) => state.exam.answer);
  const dispatch = useDispatch();
  const examId = useSelector((state) => state.exam.id);
  const examLevel = useSelector((state) => state.exam.level);
  const [examResult, setExamResult] = useState();
  const [languageKnowledge, setLanguageKnowledge] = useState();
  const [readingComprehension, setReadingComprehension] = useState();
  const [listening, setListening] = useState();
  useEffect(() => {
    const fetchExamResult = async () => {
      const res = await submitExam(examId, answers);
      setExamResult(res);
      setLanguageKnowledge(res.languageKnowledgeQuestions);
      setReadingComprehension(res.readingQuestions);
      setListening(res.listeningQuestions);
    };
    fetchExamResult();
    dispatch(resetAnswers());
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState();
  const showModal = (item) => {
    setIsModalOpen(true);
    setQuestion(item);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={cx("exam-result")}>
      <div className={cx("exam-result__header")}>
        <div className={cx("exam-result__header--right")}>
          <div className={cx("exam-image")}>
            <img src={`/images/${examLevel}.png`} alt="exam" />
          </div>
          <div className={cx("exam-info")}>
            <h2 className={cx("exam-info__title")}>{examResult?.examName}</h2>
            <div className={cx("exam-info__test-date")}>
              <FontAwesomeIcon icon={faCalendarDays} />
              <p>
                Test date:
                {moment(examResult?.examDate).format("MMMM DD, YYYY")}
              </p>
            </div>
          </div>
        </div>
        <div>
          <Link to={routes.examFolder}>
            <Button type="primary" icon={<RollbackOutlined />}>
              Back
            </Button>
          </Link>
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
              <td
                className={
                  examResult?.status === "Pass"
                    ? cx("status", "pass")
                    : cx("status", "fail")
                }
              >
                {examResult?.status}
              </td>
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
      <div className={cx("exam-result__table")}>
        <h4>- Language knowledge(Characters / Vocabulary / Grammar)</h4>
        <table>
          <tbody>
            <tr>
              <th>Question</th>
              <th>Answers</th>
              <th>Correct Answers</th>
              <th>Result</th>
            </tr>
            {languageKnowledge?.map((item, index) => (
              <tr
                key={index}
                onClick={() => showModal(item)}
                className={cx("exam-result__row")}
              >
                <td>Q. {index + 1}</td>
                <td>{item.answer}</td>
                <td>{item.correctAnswer}</td>
                <td>
                  {item.answer === item.correctAnswer ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "#04c40d" }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faX} style={{ color: "#e12b1c" }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={cx("exam-result__table")}>
        <h4>- Reading Comprehension</h4>
        <table>
          <tbody>
            <tr>
              <th>Question</th>
              <th>Answers</th>
              <th>Correct Answers</th>
              <th>Result</th>
            </tr>
            {readingComprehension?.map((item, index) => (
              <tr
                key={index}
                onClick={() => showModal(item)}
                className={cx("exam-result__row")}
              >
                <td>Q. {index + 1}</td>
                <td>{item.answer}</td>
                <td>{item.correctAnswer}</td>
                <td>
                  {item.answer === item.correctAnswer ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "#04c40d" }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faX} style={{ color: "#e12b1c" }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={cx("exam-result__table")}>
        <h4>- Listening</h4>
        <table>
          <tbody>
            <tr>
              <th>Question</th>
              <th>Answers</th>
              <th>Correct Answers</th>
              <th>Result</th>
            </tr>
            {listening?.map((item, index) => (
              <tr
                key={index}
                onClick={() => showModal(item)}
                className={cx("exam-result__row")}
              >
                <td>Q. {index + 1}</td>
                <td>{item.answer}</td>
                <td>{item.correctAnswer}</td>
                <td>
                  {item.answer === item.correctAnswer ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "#04c40d" }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faX} style={{ color: "#e12b1c" }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        title="Answer Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        style={{
          top: 20,
        }}
        bodyStyle={{ overflowY: "auto", maxHeight: "450px", overflow: "auto" }}
      >
        <div className={cx("question")}>
          {question?.audioFile ? (
            <div className={cx("question__audio")}>
              <audio controls>
                <source src={question?.audioFile} type="audio/ogg" />
              </audio>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={cx("question__title")}>{question?.title}</div>
        <div className={cx("question__image")}>
          {question?.image ? (
            <img src={question?.image} width={400} alt="" />
          ) : (
            <></>
          )}
        </div>
        <div className={cx("question__content")}>{question?.text}</div>
        <div className={cx("list-answer")}>
          {question?.option1 ? (
            <div className={cx("answer")}>
              <input type="radio" disabled checked={question.answer === 1} />
              <div className={cx("answer__content")}>
                1.
                <span
                  className={
                    question.correctAnswer === 1 ? cx("correct") : cx("")
                  }
                >
                  {question?.option1}
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {question?.option2 ? (
            <div className={cx("answer")}>
              <input type="radio" disabled checked={question.answer === 2} />
              <div className={cx("answer__content")}>
                2.
                <span
                  className={
                    question.correctAnswer === 2 ? cx("correct") : cx("")
                  }
                >
                  {question?.option2}
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {question?.option3 ? (
            <div className={cx("answer")}>
              <input type="radio" disabled checked={question.answer === 3} />
              <div className={cx("answer__content")}>
                3.
                <span
                  className={
                    question.correctAnswer === 3 ? cx("correct") : cx("")
                  }
                >
                  {question?.option3}
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {question?.option4 ? (
            <div className={cx("answer")}>
              <input type="radio" disabled checked={question.answer === 4} />
              <div className={cx("answer__content")}>
                4.
                <span
                  className={
                    question.correctAnswer === 4 ? cx("correct") : cx("")
                  }
                >
                  {question?.option4}
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={cx("answer-explanation")}>
          <div className={cx("answer-explanation__title")}>Explanation</div>
          <div className={cx("answer-explanation__content")}>
            {question?.explanation}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ExamResult;
