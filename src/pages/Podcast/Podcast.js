import classNames from "classnames/bind";
import styles from "./Podcast.module.scss";
import React, { useState } from "react";
import Button from "~/components/Button/Button";
const cx = classNames.bind(styles);

function Podcast() {
  return (
    <div>
        <div className={cx("container")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src="https://files.tofugu.com/articles/japanese/2022-09-06-japanese-language-learning-podcasts-for-beginners/header-2560x.jpg"
        >
        </img>
      </div>
      <div className={cx("title")}>
        <h1>
          All <span className={cx("title--primary")}>Podcast</span>
        </h1>
      </div>
    </div>
    <div className={cx("podcast")}>
        <div className={cx("podcast__multi-sounds")}>
            <div className={cx("podcast__multi-sounds__img")}>
                <img src="https://i1.sndcdn.com/artworks-WJKqePjOtppen2ZD-KUnzbg-t500x500.jpg" className={cx("podcast__multi-sounds__img-bgr")}></img>
            </div>
        </div>
    </div>

    </div>
    
  );
}

export default Podcast