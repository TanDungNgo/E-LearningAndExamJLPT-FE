import React, { useState } from "react";
import { Carousel } from "antd";
import classNames from "classnames/bind";
import VocabularyCard from "~/components/VocabularyCard/VocabularyCard";
import VocabularyFolderCard from "~/components/VocabularyFolderCard/VocabularyFolderCard";
import styles from "./Vocabulary.module.scss";

const cx = classNames.bind(styles);

function Vocabulary() {

  const [listData, setListData] = useState([
    {
      id: 1,
      text: "情報技術",
      meaning: "Công nghệ thông tin",
      pronunciation: "じょうほうぎじゅつ",
      spelling: "jo／–ho–‾gi＼jutsu", 
      audio: "", 
      example: "情報技術の基礎知識を審査",
    },
    {
      id: 2,
      text: "合格",
      mean: "Đỗ",
      image: "",
    },
    {
      id: 3,
      text: "情報",
      mean: "TÌNH BÁO",
      image: "",
    },
    {
      id: 4,
      text: "裏",
      mean: "LÍ",
      image: "",
    }
  ]);

  
  const onChange = (currentCard) => {
    setCurrentFlashcard(currentCard);
  };

  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  // from https://react-slick.neostack.com/docs/example/custom-arrows
  const SampleNextArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'black',
          fontSize: '35px',
          lineHeight: '2',
          margin: ' -25px 0px 0px -10px'
        }}
        onClick={onClick}
      >
      </div>
    )
  }

  const SamplePrevArrow = ({ className, style, onClick  }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'black',
          fontSize: '35px',
          lineHeight: '2',
          margin: ' -25px 0px 0px -10px'
        }}
        onClick={onClick}
      >
      </div>
    )
  }
  const settings = {
    
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  }

  const renderCard = () => {
    return listData.map((item, index) => {
      return (
        <div key={index} className={cx("item")}>
          <VocabularyCard props={item} />
        </div>
      );
    });
  };

  return (
    <div>
      <div className={cx("vocabulary")}>
        <div className={cx("vocabulary__title")}>
          2000Tango N5 Chapter 5 Section 1
        </div>
        <div className={cx("vocabulary__description")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
            className={cx("vocabulary__image")}
            alt="Vocabulary"
          />
          <div className={cx("vocabulary__description-title")}>18 Vocabularies</div>
        </div>
        <div className={cx("vocabulary__content")}>
          <div className={cx("vocabulary__content__vocabulary-card")}>
            <Carousel
              arrows
              {...settings}
              afterChange={onChange}
            >
              {renderCard()}
            </Carousel>
          </div>
          </div>
          <div className={cx("vocabulary__container")}>
            <div className={cx("vocabulary-slide")}>
              {currentFlashcard + 1} / {listData.length}
            </div>
          </div>
          <div className={cx("list-vocabulary-folder")}>

            <div className={cx("list-vocabulary-folder__card")}>
              <div className={cx("list-vocabulary-folder__card1")}>
                <VocabularyFolderCard />
                <VocabularyFolderCard />
              </div>
              <div className={cx("list-vocabulary-folder__card2")}>
                <VocabularyFolderCard />
                <VocabularyFolderCard />
              </div>
            </div>
          </div>
        </div>


    </div>
  );
}

export default Vocabulary;
