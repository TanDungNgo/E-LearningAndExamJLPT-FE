import classNames from "classnames/bind";
import styles from "./AllCourse.module.scss";
import React, { useState } from "react";
import Button from "~/components/Button/Button";
import CourseCard from "~/components/CourseCard/CourseCard";
import {Pagination, Select} from 'antd';
const cx = classNames.bind(styles);
const { Option } = Select;
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
        <Select  placeholder="Level" className={cx("card-select__level")}>
          <Option value="N5">N5</Option>
          <Option value="N4">N4</Option>
          <Option value="N3">N3</Option>
          <Option value="N2">N2</Option>
          <Option value="N1">N1</Option>
        </Select>
        <Select placeholder="Type" className={cx("card-select__learning")}>
          <Option value="">Kaiwa</Option>
          <Option value="">JLPT</Option>
        </Select>
      </div>
      <div className={cx("card-course")}>
        {renderCard()}
      </div>
      <Pagination defaultCurrent={1} total={50} className={cx("card-pagination")} />
    </div>
  );
}

export default AllCourse