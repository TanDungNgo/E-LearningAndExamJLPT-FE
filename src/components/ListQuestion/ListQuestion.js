import classNames from "classnames/bind";
import styles from "./ListQuestion.module.scss";
import { useState } from "react";
import Button from "../Button/Button";
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
      <div className={cx("list-question")}>{renderQuestion()}</div>
      <div className={cx("button")}>
        <Button outline>Submit</Button>
      </div>
    </div>
  );
}

export default ListQuestion;
