import classNames from "classnames/bind";
import styles from "./Grammar.module.scss";
import React, { useState } from "react";
import Button from "~/components/Button/Button";
import {Pagination } from 'antd';
const cx = classNames.bind(styles);

function Grammar() {
  return (
    <div className={cx("card")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src="https://files.tofugu.com/articles/japanese/2022-09-30-japanese-learning-resources-fall-2022/header-5120x.jpg"
        />
      </div>
      <div className={cx("card-grammar")}>
        <div className={cx("card-grammar__title")}>
            <h1>[Ngữ pháp N3] ～ あいだ、～ あいだに</h1>
        </div>
        <div className={cx("card-grammar__content")}>
            <span>Ý nghĩa:</span><br/>
            <div className={cx("card-grammar__content-detail")}>
                「あいだ」nghĩa là trong suốt một khoảng thời gian nào đó, sự việc hay hành động gì diễn ra liên tục từ đầu đến cuối giai đoạn. <br/>
                「あいだに」nghĩa là trong giới hạn một khoảng thời gian nào đó (nhưng trước khi thời gian đó kết thúc), có một sự việc, hay hành 
                động gì đó mang tính khoảnh khắc xảy ra, không phải là hành động diễn ra liên tục.<br/>
            </div>

            <span>Cấu trúc 1:</span><br/>
            <div className={cx("card-grammar__content-detail")}>
                Vている + あいだ<br/>
                Tính từ -i/ Tính từ-na な + あいだ<br/>
                Danh từ + の + あいだ<br/>
            </div>
            
            <span>Cấu trúc 2:</span><br/>
            <div className={cx("card-grammar__content-detail")}>
                Vる/ Vている/ Vない + あいだに<br/>
                Tính từ -i/ Tính từ-na な + あいだに<br/>
                Danh từ + の + あいだに<br/>
            </div>

            <span>Ví dụ</span><br/>
            <div className={cx("card-grammar__content-detail")}>
                夏休みのあいだ、弟（おとうと）は毎日プールで泳いでいた。
            </div>
            <div className={cx("card-grammar__content-detail")}>
                Trong suốt thời gian nghỉ hè, em trai tôi ngày nào cũng đi bơi ở bể bơi. 
            </div>
            <div className={cx("card-grammar__content-detail")}>
                お風呂(おふろ) に入っているあいだに、地震(じしん)があった。
            </div>
            <div className={cx("card-grammar__content-detail")}>
                Trong khi đang tắm thì có động đất.
            </div>
        </div>
      </div>
    </div>
  );
}

export default Grammar