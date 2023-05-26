import classNames from "classnames/bind";
import styles from "./Grammar.module.scss";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button/Button";
import { useParams } from "react-router-dom";
import grammarService from "~/services/grammarService";
const cx = classNames.bind(styles);

function Grammar() {
  const { id } = useParams();
  const { getGrammarById } = grammarService();
  const [grammar, setGrammar] = useState();
  useEffect(() => {
    const getGrammar = async () => {
      const res = await getGrammarById(id);
      setGrammar(res);
    };
    getGrammar();
  }, []);
  const splitString = (str) => {
    const parts = str.split(";");
    return parts.map((part, index) => <div className={cx("paragraph")} key={index}>{part}</div>);
  };
  return (
    <div className={cx("card")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src=
            "https://files.tofugu.com/articles/japanese/2022-09-30-japanese-learning-resources-fall-2022/header-5120x.jpg"
        />
      </div>
      <div className={cx("card-grammar")}>
        <div className={cx("card-grammar__title")}>
            <h1>[Ngữ pháp {grammar ? grammar?.level: "N3"}] {grammar ? grammar?.text : "～ あいだ、～ あいだに"}</h1>
        </div>
        <div className={cx("card-grammar__content")}>
            <span>Ý nghĩa:</span><br/>
            <div className={cx("card-grammar__content-detail")}>
              {grammar ? (
                splitString(grammar?.means)
              ) : (
                <>
                  「あいだ」nghĩa là trong suốt một khoảng thời gian nào đó, sự việc hay hành động gì diễn ra liên tục từ đầu đến cuối giai đoạn.
                  「あいだに」nghĩa là trong giới hạn một khoảng thời gian nào đó (nhưng trước khi thời gian đó kết thúc), có một sự việc, hay hành 
                  động gì đó mang tính khoảnh khắc xảy ra, không phải là hành động diễn ra liên tục.
                </>
              )}
            </div>

            <span>Cấu trúc 1:</span><br/>
            <div className={cx("card-grammar__content-detail")}>
              {grammar ? (
                splitString(grammar?.explanation)
              ) : (
                <>
                  Vている + あいだ
                  Tính từ -i/ Tính từ-na な + あいだ
                  Danh từ + の + あいだ
              
                  Cấu trúc 2:
                  Vる/ Vている/ Vない + あいだに
                  Tính từ -i/ Tính từ-na な + あいだに
                  Danh từ + の + あいだに
                </>
              )}
            </div>

            <span>Ví dụ</span><br/>
            <div className={cx("card-grammar__content-detail")}>
              {grammar ? (
                splitString(grammar?.example)
              ) : (
                <>
                  夏休みのあいだ、弟（おとうと）は毎日プールで泳いでいた。
                  Trong suốt thời gian nghỉ hè, em trai tôi ngày nào cũng đi bơi ở bể bơi.
                  お風呂(おふろ) に入っているあいだに、地震(じしん)があった。
                  Trong khi đang tắm thì có động đất.
                </>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Grammar