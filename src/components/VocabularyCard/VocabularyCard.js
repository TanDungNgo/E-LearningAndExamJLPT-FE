import classNames from "classnames/bind";
import styles from "./VocabularyCard.module.scss";
import { useState } from "react";
import "./Card.css";
const cx = classNames.bind(styles);
function VocabularyCard({ props }) {
  const [change, setChange] = useState(true);
  //   const handleChange = (e) => {
  //     if (change) {
  //       document.getElementsByClassName(
  //         `flip-card-inner ${props.id}`
  //       )[0].style.cssText = "transform: rotateX(180deg);";
  //       setChange(false);
  //     } else {
  //       document.getElementsByClassName(
  //         `flip-card-inner ${props.id}`
  //       )[0].style.cssText = "transform: 0";
  //       setChange(true);
  //     }
  //   };
  const [isFlipped, setIsFlipped] = useState(false);

  const handleChange = () => {
    setIsFlipped(!isFlipped);
  };

  const flipCardStyle = {
    transform: isFlipped ? "rotateX(180deg)" : "none",
  };
  return (
    <div className={cx("flip-card")} onClick={handleChange}>
      <div className={cx(`flip-card-inner ${props.id}`)} style={flipCardStyle}>
        <div className={cx("flip-card-front")}>
          <div className={cx("title")}>{props.text}</div>
        </div>
        <div className={cx("flip-card-back")}>
          <div className={cx("card-kanji-body")}>
            <div className={cx("mean")}> Nghĩa: {props.meaning}</div>
            <div className={cx("mean")}>Phiên âm: {props.pronunciation}</div>
            <div className={cx("mean")}>Cách đọc: {props.spelling}</div>
            <div className={cx("mean")}>{props.audio}</div>
            <div className={cx("mean")}>Ví dụ: {props.example}</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default VocabularyCard;
