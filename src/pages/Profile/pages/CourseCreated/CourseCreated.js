import React, { useEffect, useState } from "react";
import CourseCard from "../../../../components/CourseCard/CourseCard";
import classNames from "classnames/bind";
import styles from "./CourseCreated.module.scss";
import courseService from "~/services/courseService";
import { Space, Spin } from "antd";

const cx = classNames.bind(styles);

function CourseCreated() {
  const [MyCourse, setListMyCourse] = useState([]);
  const { getMyCourse } = courseService();

  useEffect(() => {
    getMyCourse().then((res) => {
      console.log(res);
      setListMyCourse(res);
    });
  }, []);

  const renderCard = () => {
    return MyCourse?.map((item, index) => {
      return (
        <div key={index}>
          <CourseCard course = {item}/>
        </div>
      )
    })
  };

  return (
    <div>
      <div className={cx("list-course__header")}>
        <h1 className={cx("list-course__title")}>
          Courses
          <span className={cx("list-course__title--primary")}> Created</span>
        </h1>
      </div>
      <div className={cx("list-course")}>
        {MyCourse ? (
          renderCard()
        ) : (
          <Space size="large" className={cx("loading-spinner")}>
            <Spin tip="Loading" size="large" />
          </Space>
        )}
      </div>
    </div>
  );
}

export default CourseCreated;
