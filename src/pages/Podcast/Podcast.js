import classNames from "classnames/bind";
import styles from "./Podcast.module.scss";
import React, { useState } from "react";
import { Card, Button } from "antd";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
const { Meta } = Card;

const podcastData = [
  {
    title: "Podcast Episode 1",
    description: "Description of Episode 1",
    thumbnail:
      "https://i1.sndcdn.com/artworks-WJKqePjOtppen2ZD-KUnzbg-t500x500.jpg",
    audioUrl: "",
  },
  {
    title: "Podcast Episode 2",
    description: "Description of Episode 2",
    thumbnail:
      "https://i1.sndcdn.com/artworks-WJKqePjOtppen2ZD-KUnzbg-t500x500.jpg",
    audioUrl: "",
  },
  // Add more episodes here...
];
function Podcast() {
  const [currentAudio, setCurrentAudio] = React.useState(null);

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
            src="https://files.tofugu.com/articles/japanese/2022-09-06-japanese-language-learning-podcasts-for-beginners/header-2560x.jpg"
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
                    <FontAwesomeIcon
                      className={cx("card-podcast__icon")}
                      icon={faPlay}
                      onClick={() => handlePlay(episode.audioUrl)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {currentAudio && (
            <AudioPlayer
              autoPlay
              src={currentAudio}
              onEnded={handleAudioEnded}
              style={{ marginTop: 20 }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Podcast;
