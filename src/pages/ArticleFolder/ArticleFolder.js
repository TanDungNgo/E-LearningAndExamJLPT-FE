import classNames from "classnames/bind";
import styles from "./ArticleFolder.module.scss";
import React, { useState } from "react";
import Button from "~/components/Button/Button";
import {Pagination } from 'antd';
import ArticleCard from "~/components/ArticleCard/ArticleCard";
const cx = classNames.bind(styles);

function ArticleFolder() {
  const [listArticleFolder, setListArticleFolder] = useState([
    "1",
    "2",
    "3",
    "4",

  ]);
  const renderCard = () => {
    return listArticleFolder.map((item, index) => {
      return (
        <div key={index}>
          <ArticleCard/>
        </div>
      );
    });
  };
  return (
    <div className={cx("container")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src="https://files.tofugu.com/articles/japanese/2022-11-22-katakanization/header-2560x.jpg"
        >
        </img>
      </div>
      
      <div className={cx("card-search")}>
        <input type="text" placeholder="Search Article" required />
        <Button className={cx("btn-search")}>Search</Button>
      </div>

      <div className={cx("card-title")}>
        SOME OF OUR ARTICLES
      </div>
      <div className={cx("card-article")}>
        {renderCard()}
      </div>
      <Pagination defaultCurrent={1} total={50} className={cx("card-pagination")} />
    </div>
  );
}

export default ArticleFolder