import React, { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import classNames from "classnames/bind";
import styles from "./CompletedCourse.module.scss";
import routes from "~/configs/routes";
import courseService from "~/services/courseService";
import { Space, Spin } from "antd";

const cx = classNames.bind(styles);

function CompletedCourse() {
  const [listCourse, setListCourse] = useState();
  const { getAllCourse, getCompletedCourses } = courseService();
  const [completedCourse, setListCompletedCourse] = useState();
  useEffect(() => {
    getCompletedCourses().then((res) => {
      setListCompletedCourse(res);
    });
  }, []);
  const renderCard = () => {
    return completedCourse?.map((item, index) => {
      return (
        <div key={index}>
          <CourseCard course={item} />
        </div>
      );
    });
  };

  return (
    <div>
      <div className={cx("list-course__header")}>
        <h1 className={cx("list-course__title")}>
          Completed
          <span className={cx("list-course__title--primary")}> Courses</span>
        </h1>
      </div>
      <div className={cx("list-course")}>
        {completedCourse ? (
          renderCard()
        ) : (
          <Space>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </Space>
        )}
      </div>
    </div>
  );
}

export default CompletedCourse;
