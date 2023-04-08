import TeacherCard from "../TeacherCard/TeacherCard";
import classNames from "classnames/bind";
import styles from "./ListTeacher.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);
function ListTeacher() {
  const [listTeacher, setListTeacher] = useState(["1", "2", "3"]);
  const renderCard = () => {
    return listTeacher.map((item, index) => {
      return (
        <div key={index} className="item">
          <TeacherCard />
        </div>
      );
    });
  };
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <h1>
          Popular <span className={cx("title--primary")}>Teacher</span>
        </h1>
      </div>
      <div className={cx("list-card")}>{renderCard()}</div>
    </div>
  );
}

export default ListTeacher;
