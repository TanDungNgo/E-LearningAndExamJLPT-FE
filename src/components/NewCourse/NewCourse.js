import React, { useEffect, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import classNames from "classnames/bind";
import styles from "./NewCourse.module.scss";
import Button from "../Button/Button";
import routes from "~/configs/routes";
import courseService from "~/services/courseService";
import { Space, Spin } from "antd";
import AuthService from "~/services/authService";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function NewCourse() {
  const [listCourse, setListCourse] = useState();
  const { getNewCourse } = courseService();
  const { getCurrentUser } = AuthService();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    if (user) {
      const hasStudentRole = user.roles.some((role) => role.name === "STUDENT");
      setCurrentUser(hasStudentRole);
    } else {
      getCurrentUser().then((res) => {
        setCurrentUser(res);
      });
    }
  }, []);
  useEffect(() => {
    getNewCourse().then((res) => {
      setListCourse(res);
    });
  }, []);
  const renderCard = () => {
    return listCourse?.map((item, index) => {
      return (
        <div ckey={index}>
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
        {currentUser ? (
            <>
                <Button outline className={cx("button__explore")} to={routes.completedCourse}>
                    Link to my courses...
                </Button>
            </>
            ) : (
            <>
            </>
        )}
      </div>
    </div>
  );
}

export default NewCourse;
