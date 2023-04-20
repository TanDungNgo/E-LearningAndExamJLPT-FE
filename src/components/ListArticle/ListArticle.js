import classNames from "classnames/bind";
import styles from "./ListArticle.module.scss";
import ArticleCard from "../ArticleCard/ArticleCard";
const cx = classNames.bind(styles);

function ListArticle() {
  return (
    <div className={cx("container")}>
        <div className={cx("title")}>
            <h1>Recent <span className={cx("title--primary")}>Articles</span></h1>
        </div>
      <ArticleCard />
      <ArticleCard />
    </div>
  );
}

export default ListArticle;
