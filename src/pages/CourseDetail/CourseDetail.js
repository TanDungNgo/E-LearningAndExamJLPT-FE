import classNames from "classnames/bind";
import styles from "./CourseDetail.module.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button/Button";
import Header from "~/layouts/components/Header/Header";
import Footer from "~/layouts/components/Footer/Footer";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CourseCard from "~/components/CourseCard/CourseCard";
import EnrollCard from "~/components/EnrollCard/EnrollCard";
const cx = classNames.bind(styles);

function CourseDetail(){
  const [listCourse, setListCourse] = useState([
    "1",
    "2",
    "3",
    "4",
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
        <div className={cx("poster__course")}>
            <img
                className={cx("poster__course-img")} 
                src="/images/poster_course.jpg">
            </img>
        </div>
        <div className={cx("card__rating")}>
            <div className={cx("card__rating-title")}>Rating:</div>
            <div className={cx("card__rating-star")}>
              <svg className={cx("card__rating-star-detail")} width="40" height="40" viewBox="0 0 940.688 940.688">
                <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
              </svg>
              <svg className={cx("card__rating-star-detail")} width="40" height="40" viewBox="0 0 940.688 940.688">
                <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
              </svg>
              <svg className={cx("card__rating-star-detail")} width="40" height="40" viewBox="0 0 940.688 940.688">
                <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
              </svg>
              <svg className={cx("card__rating-star-detail")} width="40" height="40" viewBox="0 0 940.688 940.688">
                <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
              </svg>
              <svg className={cx("card__rating-star-detail")} width="40" height="40" viewBox="0 0 940.688 940.688">
                <path d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8 c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601 c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z" />
              </svg>
            </div>
            <div className={cx("enroll-card")}>
                <EnrollCard/>
            </div>
        </div>
        <div className={cx("card__intro")}>
            <div className={cx("card__intro-title")}>Course Introduction</div>
            <li>This is a foundation course to help you master the basics of N3-level grammar, vocabulary, kanji, and reading comprehension.</li>
            <li>The course also alternates methods-tips for quick reading comprehension as well as how to memorize N3-level kanji.</li>
            <li>By the end of the course, you will be able to master about 400-800 kanji, vocabulary, and most important grammar patterns of level N3.</li>
        </div>
        <div className={cx("card__content")}>
            <div className={cx("card__content-title")}>Course Content</div>
            <li>5 video lectures.</li>
            <li>10 downloadable resources.</li>
            <li>Full access for life.</li>
            <li>Certificate of course completion.</li>
        </div>
        <div className={cx("card__relatedcourse")}>
            <div className={cx("card__relatedcourse-title")}>Related Course</div>
            <div className={cx("card__relatedcourse-detail")}>
                <FontAwesomeIcon icon={faChevronLeft} className={cx("icon__left")}></FontAwesomeIcon>
                {renderCard()}
                <FontAwesomeIcon icon={faChevronRight} className={cx("icon__right")}></FontAwesomeIcon>
            </div>
        </div>
    </div>
  );
}

export default CourseDetail