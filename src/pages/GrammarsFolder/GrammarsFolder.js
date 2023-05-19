import classNames from "classnames/bind";
import styles from "./GrammarsFolder.module.scss";
import React, { useState } from "react";
import Button from "~/components/Button/Button";
import {Pagination } from 'antd';
import ArticleCard from "~/components/ArticleCard/ArticleCard";
import ListGrammar from "~/components/ListGrammar/ListGrammar";
const cx = classNames.bind(styles);

function GrammarsFolder() {
  return (
    <div className={cx("container")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src="https://files.tofugu.com/articles/japanese/2017-04-07-japanese-learning-resources-march-2017/header-5120x.jpg"
        >
        </img>
      </div>
      
      <div className={cx("card-search")}>
        <input type="text" placeholder="Search Grammar" required />
        <Button className={cx("btn-search")}>Search</Button>
      </div>

      <div className={cx("card-grammar")}>
        <ListGrammar/>
      </div>
      <Pagination defaultCurrent={1} total={50} className={cx("card-pagination")} />
    </div>
  );
}

export default GrammarsFolder