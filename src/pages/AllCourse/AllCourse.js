import classNames from "classnames/bind";
import styles from "./AllCourse.module.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button/Button";
import Header from "~/layouts/components/Header/Header";
import Footer from "~/layouts/components/Footer/Footer";
import { faArrowLeft, faArrowRight, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CourseCard from "~/components/CourseCard/CourseCard";
import EnrollCard from "~/components/EnrollCard/EnrollCard";
const cx = classNames.bind(styles);

function AllCourse(){
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
            <input type="text" placeholder="Search your favourite course" required/>
            <Button className={cx("btn-search")}>Search</Button>
        </div>
        <div className={cx("card-select")}>
            <select className={cx("card-select__level")}>
                <option value="">N5</option>
                <option value="">N4</option>
                <option value="">N3</option>
            </select>
            <select className={cx("card-select__learning")}>
                <option value="">Kaiwa</option>
                <option value="">Grammar</option>
                <option value="">Kanji</option>
                <option value="">vocabulary</option>
                <option value="">Listening</option>
            </select>
        </div>
        <div className={cx("card-course")}>
            {renderCard()}
        </div>
        <div className={cx("card-pagination")}>
            
            <FontAwesomeIcon icon={faChevronLeft} className={cx("icon-pagination__left")}></FontAwesomeIcon>
            <ul className={cx("ul-pagination")}>
                <li className={cx("link")} value="1">1</li>
                <li className={cx("link_active")} value="2">2</li>
                <li className={cx("link")} value="3">3</li>
                <li className={cx("link")} value="4">4</li>
            </ul>
            <FontAwesomeIcon icon={faChevronRight} className={cx("icon-pagination__right")}></FontAwesomeIcon>
        </div>
    </div>
  );
}

export default AllCourse