import classNames from "classnames/bind";
import styles from "./ListArticle.module.scss";
import ArticleCard from "../ArticleCard/ArticleCard";
import { useState } from "react";
const cx = classNames.bind(styles);

function ListArticle() {
  const [listArticle, setListArticle] = useState(["1", "2", "3"]);
  const renderCard = () => {
    return listArticle.map((item, index) => {
      return (
        <div key={index} className="item">
          <ArticleCard />
        </div>
      );
    });
  };
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <h1>
          Recent <span className={cx("title--primary")}>Articles</span>
        </h1>
      </div>
      {renderCard()}
    </div>
  );
}

export default ListArticle;
