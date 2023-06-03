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
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { data } from "../Admin/components/DashboardChart/DashboardChart";

const cx = classNames.bind(styles);

function Vocabulary() {
  const { id } = useParams();
  const { getVocabularyFolderById, getNextVocabularyFolders } = vocabularyFolderService();
  const [listVocabularies, setListVocabularies] = useState([]);
  const [vocabularyFolder, setVocabularyFolder] = useState();
  const [indexVocabulary, setIndexVocabulary] = useState(0);
  const [listNextVocabularyFolder, setNextListVocabularyFolder] = useState();

  useEffect(() => {
    getNextVocabularyFolders(id).then((res) => {
      setVocabularyFolder(res);
      setNextListVocabularyFolder(res);
      console.log("[VocabularyFolder2]", res);
    });
  }, []);
  useEffect(() => {
    getVocabularyFolderById(id).then((res) => {
      setVocabularyFolder(res);
      setListVocabularies(res.vocabularies);
      setPlaylist(res.vocabularies.map((item) => item.audio));
    });
  }, []);

  const renderCardFolder = () => {
      return listNextVocabularyFolder?.map((item, index) => {
        return (
          <div key={index}>
            <VocabularyFolderCard vocabularyFolder={item} />
          </div>
        );
      });
    };
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
    setIndexVocabulary(currentCard);
  };

  const SampleNextArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          color: "white",
          fontSize: "35px",
          lineHeight: "2",
          margin: " -100px 0px 0px -15px",
        }}
        onClick={onClick}
      >
        <RightOutlined style={{ color: "black" }} />
      </div>
    );
  };

  const SamplePrevArrow = ({ className, style, onClick }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          color: "white",
          fontSize: "35px",
          lineHeight: "2",
          margin: " -100px 0px 0px -15px",
        }}
        onClick={onClick}
      >
        <LeftOutlined style={{ color: "black" }} />
      </div>
    );
  };
  const settings = {
    nextArrow: (
      <SampleNextArrow
        onClick={() => {
          setIndexVocabulary(indexVocabulary + 1);
          handleSoundClick(indexVocabulary + 1);
        }}
      />
    ),
    prevArrow: (
      <SamplePrevArrow
        onClick={() => {
          setIndexVocabulary(indexVocabulary - 1);
          handleSoundClick(indexVocabulary - 1);
        }}
      />
    ),
  };

  //xu ly am thanh
  const [playlist, setPlaylist] = useState([]);
  const audioRef = useRef(null);
  const handleSoundClick = (index) => {
    audioRef.current.src = playlist[index];
    audioRef.current.play();
  };
  return (
    <div>
      <div className={cx("vocabulary")}>
        <div className={cx("vocabulary__title")}>{vocabularyFolder?.title}</div>
        <div className={cx("vocabulary__description")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
            className={cx("vocabulary__image")}
            alt="Vocabulary"
          />
          <div className={cx("vocabulary__description-title")}>
            {vocabularyFolder?.count} Vocabularies
          </div>
        </div>
        <div className={cx("vocabulary__sound")}>
          <FontAwesomeIcon
            icon={faVolumeHigh}
            className={cx("icon-sound")}
            onClick={() => handleSoundClick(indexVocabulary)}
          />
          <audio ref={audioRef} controls hidden>
            <source type="audio/ogg" />
          </audio>
        </div>

        <div className={cx("vocabulary__content")}>
          <Carousel
            style={{
              width: "680px",
              margin: "0 auto",
            }}
            arrows
            {...settings}
            afterChange={onChange}
          >
            {renderCard()}
          </Carousel>
        </div>
        <div className={cx("vocabulary__container")}>
          <div className={cx("vocabulary-slide")}>
            {indexVocabulary + 1} / {listVocabularies.length}
          </div>
        </div>
        <div className={cx("list-vocabulary-folder")}>
          <div className={cx("list-vocabulary-folder__card")}>
            { renderCardFolder() }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vocabulary;
