import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./UpdateCourse.module.scss";
import routes from "~/configs/routes";
import courseService from "~/services/courseService";
import { Space, Spin } from "antd";
import UpdateCourseCard from "../UpdateCourseCard/UpdateCourseCard";

const cx = classNames.bind(styles);

function UpdateCourse() {
  const [listCourse, setListCourse] = useState();
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
          <UpdateCourseCard course={item} />
        </div>
      );
    });
  };

  return (
    <div>
      <div className={cx("list-course__header")}>
        <h1 className={cx("list-course__title")}>
          My
          <span className={cx("list-course__title--primary")}> Course</span>
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
    </div>
  );
}

export default UpdateCourse;
