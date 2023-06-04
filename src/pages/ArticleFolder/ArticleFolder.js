import classNames from "classnames/bind";
import styles from "./ArticleFolder.module.scss";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button/Button";
import {Pagination } from 'antd';
import ArticleCard from "~/components/ArticleCard/ArticleCard";
import { useParams } from "react-router-dom";
import articlesService from "~/services/articlesService";
const cx = classNames.bind(styles);

function ArticleFolder() {
  const { id } = useParams();
  const { getAllArticles } = articlesService();
  const [listArticle, setListArticle] = useState();
  useEffect(() => {
    getAllArticles().then((res) => {
      setListArticle(res);
    });
  }, []);
  const renderCard = () => {
    return listArticle?.map((item, index) => {
      return(
        <div key = {index}>
          <ArticleCard article = {item}/>
        </div>
      )
    
    })
  }
  return (
    <div className={cx("container")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src="/images/brg-article.png"
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
    </div>
  );
}

export default ArticleFolder