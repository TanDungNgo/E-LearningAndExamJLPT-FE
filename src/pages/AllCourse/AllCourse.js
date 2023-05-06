import classNames from "classnames/bind";
import styles from "./AllCourse.module.scss";
import React, { useState } from "react";
import Button from "~/components/Button/Button";
import CourseCard from "~/components/CourseCard/CourseCard";
import {Pagination } from 'antd';
const cx = classNames.bind(styles);

function AllCourse() {
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
    <div className={cx("container")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src="/images/bg_allcourse.jpg"
        >
        </img>
      </div>
      <div className={cx("card-search")}>
        <input type="text" placeholder="Search your favourite course" required />
        <Button className={cx("btn-search")}>Search</Button>
      </div>
      <div className={cx("card-select")}>
        <select className={cx("card-select__level")}>
          <option value="N5">N5</option>
          <option value="N4">N4</option>
          <option value="N3">N3</option>
          <option value="N2">N2</option>
          <option value="N1">N1</option>
        </select>
        <select className={cx("card-select__learning")}>
          <option value="">Kaiwa</option>
          <option value="">JLPT</option>
        </select>
      </div>
      <div className={cx("card-course")}>
        {renderCard()}
      </div>
      <Pagination defaultCurrent={1} total={50} className={cx("card-pagination")} />
    </div>
  );
}

export default AllCourse