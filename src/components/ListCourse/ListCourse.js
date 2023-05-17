import React, { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import classNames from "classnames/bind";
import styles from "./ListCourse.module.scss";
import Button from "../Button/Button";
import routes from "~/configs/routes";
import courseService from "~/services/courseService";

const cx = classNames.bind(styles);

function ListCourse() {
  const [listCourse, setListCourse] = useState([]);
  const { getAllCourse } = courseService();
  useEffect(() => {
    getAllCourse().then((res) => {
      setListCourse(res);
    });
  }, []);
  const renderCard = () => {
    return listCourse?.map((item, index) => {
      return (
        <div key={index}>
          <CourseCard course={item} />
        </div>
      );
    });
  };
  const [activeButton, setActiveButton] = useState("JLPT");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <div className={cx("list-course__header")}>
        <h1 className={cx("list-course__title")}>
          Popular
          <span className={cx("list-course__title--primary")}>Courses</span>
        </h1>
        <div className={cx("list-course__action")}>
          <button
            className={cx("list-course__button", {
              "list-course__button--active": activeButton === "JLPT",
              "list-course__button--inactive": activeButton !== "JLPT",
            })}
            onClick={() => handleButtonClick("JLPT")}
          >
            JLPT
          </button>
          <button
            className={cx("list-course__button", {
              "list-course__button--active": activeButton === "Kaiwa",
              "list-course__button--inactive": activeButton !== "Kaiwa",
            })}
            onClick={() => handleButtonClick("Kaiwa")}
          >
            Kaiwa
          </button>
        </div>
      </div>
      <div className={cx("list-course")}>{renderCard()}</div>
      <div className={cx("list-course__footer")}>
        <Button outline className={cx("button__explore")} to={routes.allcourse}>
          Explore all Courses
        </Button>
      </div>
    </div>
  );
}

export default ListCourse;
