import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AudioPlayer.module.scss";

const cx = classNames.bind(styles);

const AudioPlayer = ({ src }) => {
  return (
    <div className={cx("audio-player")}>
      <audio controls autoPlay>
        <source src={src} type="audio/ogg" />
      </audio>
    </div>
  );
};

export default AudioPlayer;
