import classNames from "classnames/bind";
import styles from "./ListGrammar.module.scss";
import ArticleCard from "../GrammarCard/GrammarCard";
import { useState } from "react";
import GrammarCard from "../GrammarCard/GrammarCard";
const cx = classNames.bind(styles);

function ListGrammar() {
  const [listGrammar, setListGrammar] = useState(["1", "2", "3", "4"]);
  const renderCard = () => {
    return listGrammar.map((item, index) => {
      return (
        <div key={index} className="item">
          <GrammarCard />
        </div>
      );
    });
  };
  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <h1>
          All <span className={cx("title--primary")}>Grammar</span>
        </h1>
      </div>
      {renderCard()}
    </div>
  );
}

export default ListGrammar;
