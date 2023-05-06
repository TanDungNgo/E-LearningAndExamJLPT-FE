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
import { useEffect, useState } from "react";
import { ExamData } from "./ExamData";
import Swal from "sweetalert2";
const cx = classNames.bind(styles);

function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState(ExamData);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill("")
  );
  const [statusAnswers, setStatusAnswers] = useState(
    questions.map((_, index) => (index === 0 ? "not-done" : "not-seen"))
  );
  const [isCounting, setIsCounting] = useState(true);
  const [time, setTime] = useState(180);

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = answer;
    setSelectedAnswers(updatedAnswers);
    const updatedStatusAnswers = [...statusAnswers];
    updatedStatusAnswers[currentQuestion] = "done";
    setStatusAnswers(updatedStatusAnswers);
  };

  const handleClearSelection = () => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = "";
    setSelectedAnswers(updatedAnswers);

    const updatedStatusAnswers = [...statusAnswers];
    updatedStatusAnswers[currentQuestion] = "not-done";
    setStatusAnswers(updatedStatusAnswers);
  };
  const handleQuestionClick = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    const updatedStatusAnswers = [...statusAnswers];
    if (updatedStatusAnswers[questionIndex] === "not-seen") {
      updatedStatusAnswers[questionIndex] = "not-done";
      setStatusAnswers(updatedStatusAnswers);
    }
  };
  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    const updatedStatusAnswers = [...statusAnswers];
    if (updatedStatusAnswers[currentQuestion + 1] === "not-seen") {
      updatedStatusAnswers[currentQuestion + 1] = "not-done";
      setStatusAnswers(updatedStatusAnswers);
    }
  };
  const handlePrevQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
    const updatedStatusAnswers = [...statusAnswers];
    if (updatedStatusAnswers[currentQuestion - 1] === "not-seen") {
      updatedStatusAnswers[currentQuestion - 1] = "not-done";
      setStatusAnswers(updatedStatusAnswers);
    }
  };
  useEffect(() => {
    let timer;

    if (isCounting) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCounting]);

  useEffect(() => {
    if (time === 0) {
      setIsCounting(false);
      Swal.fire("Time out!", "You submited the exam!", "warning");
    }
  }, [time]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };
  const renderAnswers = () => {
    return questions[currentQuestion].answers.map((answer, index) => {
      return (
        <label htmlFor={`answer${index + 1}`} key={index}>
          <div className={cx("answer")}>
            <input
              type="radio"
              name="question1"
              id={`answer${index + 1}`}
              checked={selectedAnswers[currentQuestion] === index + 1}
              onChange={() => handleAnswerSelect(index + 1)}
            />
            <div className={cx("answer__content")}>
              {index + 1}.<span>{answer}</span>
            </div>
          </div>
        </label>
      );
    });
  };
  return (
    <div className={cx("exam")}>
      <div className={cx("exam__header")}>
        <div className={cx("exam__header--left")}>
          <div className={cx("couter-time")}>{formatTime(time)}</div>
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
              Q {currentQuestion + 1} / <span>{questions.length}</span>
            </div>
          </div>
          <div className={cx("question__title")}>
            {questions[currentQuestion].title}
          </div>
          <div className={cx("question__content")}>
            {questions[currentQuestion].question}
          </div>
          <div className={cx("list-answer")}>{renderAnswers()}</div>
          <div className={cx("button")}>
            <Button
              primary
              className={cx("button__prev")}
              leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              Prev
            </Button>
            <Button
              primary
              className={cx("button__next")}
              rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
              onClick={handleNextQuestion}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </Button>
            <Button
              outline
              className={cx("button__clear")}
              onClick={handleClearSelection}
            >
              Clear Selection
            </Button>
          </div>
        </div>
        <div className={cx("exam__content--right")}>
          <ListQuestion
            quizzes={selectedAnswers}
            selectedQuestionIndex={currentQuestion}
            statusAnswers={statusAnswers}
            onQuestionClick={handleQuestionClick}
          />
        </div>
      </div>
    </div>
  );
}

export default ExamPage;
