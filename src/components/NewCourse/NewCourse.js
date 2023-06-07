import React, { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import classNames from "classnames/bind";
import styles from "./NewCourse.module.scss";
import Button from "../Button/Button";
import routes from "~/configs/routes";
import courseService from "~/services/courseService";
import { Space, Spin } from "antd";

const cx = classNames.bind(styles);

function NewCourse() {
  const [listCourse, setListCourse] = useState();
  const { getNewCourse } = courseService();
  useEffect(() => {
    getNewCourse().then((res) => {
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

  return (
    <div className={cx("container")}>
      <div className={cx("list-course__header")}>
        <h1 className={cx("list-course__title")}>
          New
          <span className={cx("list-course__title--primary")}> Courses</span>
        </h1>
      </div>
      <div className={cx("list-course")}>
        {listCourse ? (
          renderCard()
        ) : (
          <Space>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </Space>
        )}
      </div>
      <div className={cx("list-course__footer")}>
        <Button outline className={cx("button__explore")} to={routes.completedCourse}>
          Link to my courses...
        </Button>
      </div>
    </div>
  );
}

export default NewCourse;
