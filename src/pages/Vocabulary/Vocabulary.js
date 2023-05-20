import classNames from "classnames/bind";
import React, { useState } from "react";
import VocabularyCard from "~/components/VocabularyCard/VocabularyCard";
import { Carousel } from "antd";
import styles from "./Vocabulary.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import VocabularyFolderCard from "~/components/VocabularyFolderCard/VocabularyFolderCard";

const cx = classNames.bind(styles);
function Vocabulary() {
  const [listData, setListData] = useState([
    {
      id: 1,
      text: "情報技術",
      mean: "Công nghệ thông tin",
      image: "",
    },
    {
      id: 2,
      text: "合格",
      mean: "Đỗ",
      image: "",
    },
  ]);

  const renderCard = () => {
    return listData.map((item, index) => {
      return (
        <div key={index} className="item">
          <VocabularyCard props={item} />
        </div>
      );
    });
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div>
      <div className={cx("vocabulary")}>
        <div className={cx("vocabulary__title")}>
          2000Tango N5 Chapter 5 Section 1
        </div>
        <div className={cx("vocabulary__description")}>
          <img src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png" className={cx("vocabulary__image")}></img>
          <div className={cx("vocabulary__description-title")} > 18 Vocabularies </div>
        </div>
        <div className={cx("vocabulary__content")}>
          <FontAwesomeIcon icon={faChevronLeft} className={cx("vocabulary__content__icon-left")}/>
          <div className={cx("vocabulary__content__vocabulary-card")}>
            <Carousel afterChange={onChange}>{renderCard()}</Carousel>
          </div>
          <FontAwesomeIcon icon={faChevronRight} className={cx("vocabulary__content__icon-right")}/>

          <div className={cx("list-vocabulary-folder")}>
            <div className={cx("list-vocabulary-folder__card")}>
            <div className={cx("list-vocabulary-folder__card1")}>
              <VocabularyFolderCard/>
              <VocabularyFolderCard/>
            </div>
            <div className={cx("list-vocabulary-folder__card2")}>
              <VocabularyFolderCard/>
              <VocabularyFolderCard/>

            </div>

            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Vocabulary;
