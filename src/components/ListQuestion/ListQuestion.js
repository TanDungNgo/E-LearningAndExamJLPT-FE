import classNames from "classnames/bind";
import styles from "./ListQuestion.module.scss";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import examService from "~/services/examService";
import { useNavigate, useParams } from "react-router-dom";
import routes from "~/configs/routes";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer } from "~/redux/examSlice";
const cx = classNames.bind(styles);

function ListQuestion(props) {
  const { level } = useParams();
  const { type } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAllDone = props.statusAnswers.every((status) => status === "done");
  const renderQuestion = () => {
    return props.quizzes.map((question, index) => {
      if (props.statusAnswers[index] === "done") {
        return (
          <div
            className={
              index === props.selectedQuestionIndex
                ? cx("question", "done", "selected")
                : cx("question", "done")
            }
            key={index}
            onClick={() => {
              props.onQuestionClick(index);
            }}
          >
            {index + 1}
          </div>
        );
      } else if (props.statusAnswers[index] === "not-done") {
        return (
          <div
            className={
              index === props.selectedQuestionIndex
                ? cx("question", "not-done", "selected")
                : cx("question", "not-done")
            }
            key={index}
            onClick={() => {
              props.onQuestionClick(index);
            }}
          >
            {index + 1}
          </div>
        );
      } else {
        return (
          <div
            className={
              index === props.selectedQuestionIndex
                ? cx("question", "selected")
                : cx("question")
            }
            key={index}
            onClick={() => {
              props.onQuestionClick(index);
            }}
          >
            {index + 1}
          </div>
        );
      }
    });
  };
  const onSubmmit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (type === "languageKnowledge") {
          Swal.fire("Submitted!", "you have completed the language knowledge", "success").then(
            () => {
              dispatch(addAnswer(props.quizzes));
              navigate(`/exam/${level}/reading`);
            }
          );
        } else if (type === "reading") {
          Swal.fire("Submitted!", "You have completed the reading", "success").then(
            () => {
              dispatch(addAnswer(props.quizzes));
              navigate(`/exam/${level}/listening`);
            }
          );
        } else {
          Swal.fire("Submitted!", "You submitted the exam", "success").then(
            () => {
              dispatch(addAnswer(props.quizzes));
              exitFullscreen();
              navigate(routes.examResult);
            }
          );
        }
      }
    });
  };
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
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
        <Button rounded onClick={onSubmmit} disabled={!isAllDone}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ListQuestion;
