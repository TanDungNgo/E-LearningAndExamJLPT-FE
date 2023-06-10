import classNames from "classnames/bind";
import styles from "./Podcast.module.scss";
import React, { useState } from "react";
import { Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import AudioPlayer from "~/components/AudioPlayer/AudioPlayer";
const cx = classNames.bind(styles);
const { Meta } = Card;

const podcastData = [
  {
    title: "Podcast 1: How to disagree with people in Japanese",
    description: "In this lesson we will teach you useful phrases for disagreeing with people and how to use them in different situations. ",
    thumbnail:
      "/images/card(2).png",
    audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/e-learning-dpt.appspot.com/o/audios%2Fpodcast_48_lesson.mp3?alt=media&token=0dfaacf9-3972-4ae4-b8bb-5b42cc02ece9&_gl=1*o46skk*_ga*MTA3NTcxNDQzOS4xNjg0MjI5OTkw*_ga_CW55HF8NVT*MTY4NjIxMzU4MS4xNy4xLjE2ODYyMTM2NDguMC4wLjA.",
  },
  {
    title: "Podcast 2: Levels of certainty in Japanese",
    description: "In this lesson Ami Sensei and I will teach you how to express different levels of certainty in Japanese, the probability you think something will happen through various example sentences and dialogues.",
    thumbnail:
      "/images/card(1).png",
    audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/e-learning-dpt.appspot.com/o/audios%2Fpodcast_49_lesson.mp3?alt=media&token=93f372fe-d48b-416d-971b-fd65135edfb6&_gl=1*10ixv9q*_ga*MTA3NTcxNDQzOS4xNjg0MjI5OTkw*_ga_CW55HF8NVT*MTY4NjIxMzU4MS4xNy4xLjE2ODYyMTM2MjYuMC4wLjA.",
  },
  // Add more episodes here...
];
function Podcast() {
  const [currentAudio, setCurrentAudio] = useState(null);

  const handlePlay = (audioUrl) => {
    setCurrentAudio(audioUrl);
  };

  const handleAudioEnded = () => {
    setCurrentAudio(null);
  };

  return (
    <div>
      <div className={cx("container")}>
        <div className={cx("card-img")}>
          <img
            className={cx("card-img__detail")}
            src="/images/brg-podcast.png"
          ></img>
        </div>
        <div className={cx("title")}>
          <h1>
            All <span className={cx("title--primary")}>Podcast</span>
          </h1>
        </div>
        <div className={cx("list-card")}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {podcastData.map((episode, index) => (
              <li key={index}>
                <div className={cx("card-podcast")}>
                  <div className={cx("card-podcast__media")}>
                    <img
                      src={episode.thumbnail}
                      className={cx("card-podcast__image")}
                    />
                  </div>
                  <div className={cx("card-podcast__info")}>
                    <div className={cx("card-podcast__topic")}>#PODCAST</div>
                    <div className={cx("card-podcast__title")}>
                      {episode.title}
                    </div>
                    <div className={cx("card-podcast__description")}>
                      {episode.description}
                    </div>
                  </div>
                  <div className={cx("card-podcast__action")}>
                    <div className={cx("border__icon")}>
                      <FontAwesomeIcon
                        className={cx("card-podcast__icon")}
                        icon={faPlay}
                        onClick={() => handlePlay(episode.audioUrl)}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {currentAudio && <AudioPlayer src={currentAudio} />}
        </div>
      </div>
    </div>
  );
}

export default Podcast;
