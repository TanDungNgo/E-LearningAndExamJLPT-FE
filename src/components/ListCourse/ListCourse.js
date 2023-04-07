import React, { useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import classNames from "classnames/bind";
import styles from "./ListCourse.module.scss";
import Button from "../Button/Button";

const cx = classNames.bind(styles);

function ListCourse() {
  const [listCourse, setListCourse] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);
  const renderCard = () => {
    return listCourse.map((item, index) => {
      return (
        <div key={index}>
          <CourseCard />
        </div>
      );
    });
  };
  return (
    <div >
      <div className={cx("list-course__header")}>
        <h1 className={cx("list-course__title")}>
          Popular{" "}
          <span className={cx("list-course__title--primary")}>Courses</span>
        </h1>
        <div className={cx("list-course__action")}>
          <button className={cx("list-course__button--active")}>JLPT</button>
          <button className={cx("list-course__button--inactive")}>Kaiwa</button>
        </div>
      </div>
      <div className={cx("list-course")}>{renderCard()}</div>
      <div className={cx("list-course__footer")}>
        <Button outline className={cx("button__explore")}>Explore all Courses</Button>
      </div>
    </div>
  );
}

export default ListCourse;
