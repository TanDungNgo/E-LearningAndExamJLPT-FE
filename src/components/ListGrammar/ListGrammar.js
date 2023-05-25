import classNames from "classnames/bind";
import styles from "./ListGrammar.module.scss";
import { useEffect, useState } from "react";
import GrammarCard from "../GrammarCard/GrammarCard";
import { Space, Spin } from "antd";
import grammarService from "~/services/grammarService";
const cx = classNames.bind(styles);

function ListGrammar() {
  const { getAllGrammars } = grammarService();
  const [listGrammar, setListGrammar] = useState();
  useEffect(() => {
    const getListGrammar = async () => {
      const res = await getAllGrammars();
      setListGrammar(res);
    };
    getListGrammar();
  }, []);
  const renderCard = () => {
    return listGrammar.map((item, index) => {
      return (
        <div key={index} className="item">
          <GrammarCard grammar={item}/>
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
      {listGrammar ? (
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

export default ListGrammar;
