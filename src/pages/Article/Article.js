import classNames from "classnames/bind";
import styles from "./Article.module.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articlesService from "~/services/articlesService";
const cx = classNames.bind(styles);

function Article() {
  const { id } = useParams();
  const { getArticleById } = articlesService();
  const [article, setArticle] = useState();
  useEffect(() => {
    const getArticle = async () => {
      const res = await getArticleById(id);
      setArticle(res);
    };
    getArticle();
  }, []);
  const splitString = (str) => {
    const parts = str.split(";");
    return parts.map((part, index) => (
      <div className={cx("paragraph")} key={index}>
        {part}
      </div>
    ));
  };
  return (
    <div className={cx("article")}>
      <div className={cx("card-img")}>
        <img className={cx("card-img__detail")} src={article?.image} />
      </div>
      <div className={cx("article__header")}>
        <div className={cx("article__title")}>{article?.title}</div>
        <div className={cx("article__subtitle")}>{article?.description}</div>
      </div>

      <div className={cx("article-container")}>
        <div className={cx("article-container__content")}>
          {article ? splitString(article?.content) : <></>}
        </div>
      </div>
    </div>
  );
}

export default Article;
