import classNames from "classnames/bind";
import styles from "./CourseDetail.module.scss";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import CourseCard from "~/components/CourseCard/CourseCard";
import EnrollCard from "~/components/EnrollCard/EnrollCard";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import courseService from "~/services/courseService";
import routes from "~/configs/routes";
import { getSuggestedQuery } from "@testing-library/react";
import { notification } from "antd";
import AuthService from "~/services/authService";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

function CourseDetail() {
  const { getCourseById, getSuggestedCourses, checkEnroll, enrollCourse } =
    courseService();
  const { id } = useParams();
  const [course, setCourse] = useState();
  const navigate = useNavigate();
  const [suggestCourses, setSuggestCourse] = useState([]);
  const [isEnroll, setIsEnroll] = useState(false);
  const [listLesson, setListLesson] = useState([]);
  const { getCurrentUser } = AuthService();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      getCurrentUser().then((res) => {
        setCurrentUser(res);
      });
    }
  }, [id]);
  useEffect(() => {
    getCourseById(id).then((res) => {
      // console.log(res);
      setCourse(res);
      setListLesson(res.lessons);
    });
  }, [id]);
  if (course === null) {
    navigate(routes.notFound);
  }
  useEffect(() => {
    checkEnroll(id).then((res) => {
      if (res === true) {
        setIsEnroll(true);
      } else {
        setIsEnroll(false);
      }
    });
  }, [id]);
  useEffect(() => {
    getSuggestedCourses().then((res) => {
      // console.log(res);
      setSuggestCourse(res);
    });
  }, []);
  const renderCard = () => {
    return suggestCourses?.map((item, index) => {
      return (
        <div key={index}>
          <CourseCard course={item} />
        </div>
      );
    });
  };
  const splitString = (str) => {
    const parts = str.split(";");
    return parts.map((part, index) => <li key={index}>{part}</li>);
  };
  const enrollCourseHandle = async () => {
    if (!currentUser) {
      notification.error({
        message: "Error!",
        description: "Please login to enroll!",
      });
      return;
    }
    const isSuccess = await enrollCourse(id);
    if (isSuccess) {
      setIsEnroll(true);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("poster__course")}>
        <img
          className={cx("poster__course-img")}
          src="/images/poster_course.jpg"
        ></img>
      </div>
      <div className={cx("card__rating")}>
        <div className={cx("card__rating-title")}>Rating:</div>
        <div className={cx("card__rating-star")}>
          <svg
            className={cx("card__rating-star-detail")}
            width="40"
            height="40"
            viewBox="0 0 940.688 940.688"
          >
            <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
          </svg>
          <svg
            className={cx("card__rating-star-detail")}
            width="40"
            height="40"
            viewBox="0 0 940.688 940.688"
          >
            <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
          </svg>
          <svg
            className={cx("card__rating-star-detail")}
            width="40"
            height="40"
            viewBox="0 0 940.688 940.688"
          >
            <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
          </svg>
          <svg
            className={cx("card__rating-star-detail")}
            width="40"
            height="40"
            viewBox="0 0 940.688 940.688"
          >
            <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
          </svg>
          <svg
            className={cx("card__rating-star-detail")}
            width="40"
            height="40"
            viewBox="0 0 940.688 940.688"
          >
            <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
          </svg>
        </div>
        <div className={cx("enroll-card")}>
          <EnrollCard
            course={course}
            checkEnroll={isEnroll}
            enrollCourse={enrollCourseHandle}
          />
        </div>
      </div>
      <div className={cx("card__intro")}>
        <div className={cx("card__intro-title")}>Course Introduction</div>
        {course?.description ? (
          splitString(course?.description)
        ) : (
          <>
            <li></li>
            <li></li>
          </>
        )}
      </div>
      <div className={cx("card__content")}>
        <div className={cx("card__content-title")}>Course Content</div>
        <li>
          {course?.lessons?.length ? course?.lessons?.length : "0"} video
          lectures.
        </li>
        <li>Full access for life.</li>
        <li>Certificate of course completion.</li>
      </div>
      {isEnroll ? (
        <div className={cx("lesson-list")}>
          <h2 className={cx("lesson-list__title")}>{course?.name}</h2>
          <ul className={cx("lesson-list__items")}>
            {listLesson.map((lesson, index) => (
              <Link key={lesson?.id} to={`/course/${id}/lesson/${lesson?.id}`}>
                <li className={cx("lesson-item")}>
                  <div className={cx("lesson-item__title")}>
                    <span>{index + 1}</span>
                    {lesson?.name}
                  </div>
                  <div className={cx("lesson-item__time")}>
                    <FontAwesomeIcon
                      icon={faPlayCircle}
                      className={cx("icon-play")}
                    />
                    <span>10:00</span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
      {currentUser ? (
        <div className={cx("card__relatedcourse")}>
          <div className={cx("card__relatedcourse-title")}>Related Course</div>
          <div className={cx("card__relatedcourse-detail")}>
            {/* <FontAwesomeIcon
              icon={faChevronLeft}
              className={cx("icon__left")}
            ></FontAwesomeIcon> */}
            {renderCard()}
            {/* <FontAwesomeIcon
              icon={faChevronRight}
              className={cx("icon__right")}
            ></FontAwesomeIcon> */}
          </div>
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default CourseDetail;
