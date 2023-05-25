import classNames from "classnames/bind";
import styles from "./ListArticle.module.scss";
import ArticleCard from "../ArticleCard/ArticleCard";
import { useEffect, useState } from "react";
import articlesService from "~/services/articlesService";
import { Space, Spin } from "antd";
const cx = classNames.bind(styles);

function ListArticle() {
  const { getAllArticles } = articlesService();
  const [listArticle, setListArticle] = useState();
  useEffect(() => {
    const getListArticle = async () => {
      const res = await getAllArticles();
      setListArticle(res);
    };
    getListArticle();
  }, []);
  const renderCard = () => {
    return listArticle.map((item, index) => {
      return (
        <div key={index}>
          <ArticleCard article={item} />
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
      {listArticle ? (
        renderCard()
      ) : (
        <Space>
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </Space>
      )}
    </div>
  );
}

export default ListArticle;
