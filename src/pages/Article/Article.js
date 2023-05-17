import classNames from "classnames/bind";
import styles from "./Article.module.scss";
import React, { useState } from "react";
import Button from "~/components/Button/Button";
import {Pagination } from 'antd';
const cx = classNames.bind(styles);

function Article() {
  return (
    <div className={cx("container")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src="https://files.tofugu.com/series/2022-08-09-whats-the-difference/header-2560x.jpg"
        />

      </div>
      <div className={cx("card-search")}>
        <input type="text" placeholder="Search your favourite course" required />
        <Button className={cx("btn-search")}>Search</Button>
      </div>
     
      
      
    </div>
  );
}

export default Article