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
            <h1>[Ngữ pháp {grammar ? grammar?.level: ""}] {grammar ? grammar?.text : ""}</h1>
        </div>
        <div className={cx("card-grammar__content")}>
            <span>Ý nghĩa:</span><br/>
            <div className={cx("card-grammar__content-detail")}>
              {grammar ? (
                splitString(grammar?.means)
              ) : (
                <>
                </>
              )}
            </div>

            <span>Cấu trúc 1:</span><br/>
            <div className={cx("card-grammar__content-detail")}>
              {grammar ? (
                splitString(grammar?.explanation)
              ) : (
                <>
                </>
              )}
            </div>

            <span>Ví dụ</span><br/>
            <div className={cx("card-grammar__content-detail")}>
              {grammar ? (
                splitString(grammar?.example)
              ) : (
                <>
                </>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Grammar