import classNames from "classnames/bind";
import styles from "./ListQuestion.module.scss";
import { useState } from "react";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function ListQuestion() {
  const [questions, setQuestions] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const renderQuestion = () => {
    return questions.map((question, index) => {
      return (
        <div className={cx("question")} key={index}>
          {index + 1}
        </div>
      );
    });
  };
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>Question Overview:</div>
      <div className={cx("explain")}>
        <div className={cx("explain__color")}>
          <div className={cx("item")}>
            <div className={cx("item--not-seen")}></div>
            <span>Not Seen</span>
          </div>
          <div className={cx("item")}>
            <div className={cx("item--done")}></div>
            <span>Done</span>
          </div>
          <div className={cx("item")}>
            <div className={cx("item--not-done")}></div>
            <span>Not Done</span>
          </div>
        </div>
        <div className={cx("explain__info")}>
          <FontAwesomeIcon icon={faInfoCircle} />
          <span>Click on the question number to go to that question.</span>
        </div>
      </div>
      <div className={cx("list-question")}>{renderQuestion()}</div>
      <div className={cx("button")}>
        <Button outline>Submit</Button>
      </div>
    </div>
  );
}

export default ListQuestion;
