import classNames from "classnames/bind";
import styles from "./Overview.module.scss";
import Button from "~/components/Button/Button";
import React, { useState } from "react";
import CourseCard from "~/components/CourseCard/CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function Overview() {
    const [listCourse] = useState([
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
        <div>
            <div className={cx("container")} >
                <div className={cx("container__poster")}>
                    <img className={cx("container__poster__backgroud")} src="/images/backgroundHome1.png" alt="" />
                    <div className={cx("container__poster__search")}>
                        <input type="text" placeholder="Want to lear?" required />
                        <Button primary className={cx("container__poster__btn-search")} > Search</Button>
                    </div>
                </div>
                <div className={cx("container__choice-course")}>
                    <div className={cx("container__choice-course__title")}>
                        Choice favourite course from category
                    </div>
                    <div className={cx("container__choice-course__group")}>
                        <div className={cx("container__choice-course__group__list")}>
                            <div className={cx("container__choice-course__group__list__course")}>
                                <img className={cx("container__choice-course__group__list__course__image")} src="/images/N5.png" alt="" />
                            </div>
                            <div className={cx("container__choice-course__group__list__course")}>
                                <img className={cx("container__choice-course__group__list__course__image")} src="/images/N4.png" alt="" />
                            </div>
                            <div className={cx("container__choice-course__group__list__course")}>
                                <img className={cx("container__choice-course__group__list__course__image")} src="/images/N3.png" alt="" />
                            </div>
                            <div className={cx("container__choice-course__group__list__course")}>
                                <img className={cx("container__choice-course__group__list__course__image")} src="/images/N2.png" alt="" />
                            </div>
                            <div className={cx("container__choice-course__group__list__course")}>
                                <img className={cx("container__choice-course__group__list__course__image")} src="/images/N1.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx("container__recommen")}>
                    <div className={cx("container__recommen__title")}>
                        Recommended for you
                    </div>
                    <div className={cx("container__recommen__course")}>
                        <FontAwesomeIcon icon={faChevronLeft} className={cx("container__recommen__course__icon-left")} />
                        <div>
                            <div className={cx("container__recommen__course__list-card")}>{renderCard()}</div>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className={cx("container__recommen__course__icon-right")} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;