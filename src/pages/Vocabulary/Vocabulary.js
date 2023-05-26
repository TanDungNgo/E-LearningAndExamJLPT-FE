import React, { useEffect, useState, useRef } from "react";
import { Carousel } from "antd";
import classNames from "classnames/bind";
import VocabularyCard from "~/components/VocabularyCard/VocabularyCard";
import VocabularyFolderCard from "~/components/VocabularyFolderCard/VocabularyFolderCard";
import styles from "./Vocabulary.module.scss";
import { useParams } from "react-router-dom";
import vocabularyFolderService from "~/services/vocabularyFolderService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Vocabulary() {
  const { id } = useParams();
  const { getVocabularyFolderById } = vocabularyFolderService();
  const [listVocabularies, setListVocabularies] = useState([]);
  const [vocabularyFolder, setVocabularyFolder] = useState();
  const [indexVocabulary, setIndexVocabulary] = useState(0);
  useEffect(() => {
    getVocabularyFolderById(id).then((res) => {
      setVocabularyFolder(res)
      setListVocabularies(res.vocabularies);
    });
  }, []);

  const renderCard = () => {
    return listVocabularies.map((item, index) => {
      return (
        <div key={index} className={cx("item")}>
          <VocabularyCard props={item} />
        </div>
      );
    });
  };
  const onChange = (currentCard) => {
    setCurrentFlashcard(currentCard);
  };

  const [currentFlashcard, setCurrentFlashcard] = useState(0);

  const SampleNextArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'black',
          fontSize: '35px',
          lineHeight: '2',
          margin: ' -40px 0px 0px -15px'
        }}
        onClick={onClick}
      >
      </div>
    )
  }

  const SamplePrevArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'black',
          fontSize: '35px',
          lineHeight: '2',
          margin: ' -40px 0px 0px -15px'
        }}
        onClick={onClick}
      >
      </div>
    )
  }
  const settings = {
    nextArrow: <SampleNextArrow onClick={() => setIndexVocabulary(indexVocabulary + 1)} />,
    prevArrow: <SamplePrevArrow onClick={() => setIndexVocabulary(indexVocabulary - 1)} />
  }

  //xu ly am thanh

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const handleSoundClick = () => {
    console.log(listVocabularies[0]?.audio);
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <div className={cx("vocabulary")}>
        <div className={cx("vocabulary__title")}>
          {vocabularyFolder?.title
            ? vocabularyFolder?.title
            : "2000Tango N5 Chapter 1 Section 1"}
        </div>
        <div className={cx("vocabulary__description")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
            className={cx("vocabulary__image")}
            alt="Vocabulary"
          />
          <div className={cx("vocabulary__description-title")}>{vocabularyFolder?.count} Vocabularies</div>
        </div>
        <div className={cx("vocabulary__sound")} onClick={handleSoundClick}>
          <FontAwesomeIcon icon={faVolumeHigh} className={cx("icon-sound")} />
          <audio ref={audioRef}>
            <source
              src={listVocabularies[indexVocabulary]?.audio}
            />
          </audio>
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
            {currentFlashcard + 1} / {listVocabularies.length}
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
