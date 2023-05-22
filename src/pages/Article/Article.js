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
    return parts.map((part, index) => <div className={cx("paragraph")} key={index}>{part}</div>);
  };
  return (
    <div className={cx("article")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src={
            article
              ? article?.image
              : "https://files.tofugu.com/articles/japanese/2022-12-27-japanese-learning-resources-winter-2022/header-2560x.jpg"
          }
        />
      </div>
      <div className={cx("article__header")}>
        <div className={cx("article__title")}>
          {article ? article?.title : "NEW JAPANESE LEARNING RESOURCES"}
        </div>
        <div className={cx("article__subtitle")}>
          {article
            ? article?.description
            : "BEST TOOLS TO HELP YOU LEARN JAPANESE"}
        </div>
      </div>

      <div className={cx("article-container")}>
        <div className={cx("article-container__content")}>
          {article ? (
            splitString(article?.content)
          ) : (
            <>
              Japanese, with its complex hiragana, katakana, and kanji writing
              systems, has always been a fascinating and fun language to learn.
              Today, with the development of technology and the Internet,
              Japanese learning resources have become richer and more diverse
              than ever. Here are some new and useful Japanese learning
              resources that you can explore. Mobile apps: There are many mobile
              apps for learning Japanese such as Duolingo, Memrise, Drops,
              Tandem and HelloTalk. These apps provide lessons, exercises,
              vocabulary and grammar in an intuitive and fun interface. You can
              also look up Japanese dictionary apps like Jisho or Takoboto to
              look up words and kanji. Online Courses: There are many online
              platforms like Coursera, Udemy, and edX that offer Japanese
              language courses. These courses are designed by professional
              instructors and give you the opportunity to learn from beginner to
              advanced. In addition, there are free courses on YouTube and
              Japanese learning websites like Tae Kim's Guide to Learning
              Japanese and NHK World - Easy Japanese. Online podcasts and
              videos: Listening to Japanese podcasts like "JapanesePod101" or
              "JLPT Stories" can help you improve your listening and
              understanding of Japanese. On YouTube, there are many Japanese
              language education channels such as "Japanese Ammo with Misa" and
              "Learn Japanese From Zero" that provide instructional videos on
              grammar, vocabulary, and communication skills. Books and
              materials: It is still valid to use traditional Japanese books and
              materials. You can find textbooks like "Genki" or "Minna no
              Nihongo" for basic to intermediate learning. In addition, there
              are also many popular Japanese grammar books, dictionaries and
              manga such as "Dictionary of Basic Japanese Grammar" and "One
              Piece" to help you acquire the language efficiently.
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Article;
