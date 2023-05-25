import classNames from "classnames/bind";
import styles from "./GrammarsFolder.module.scss";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button/Button";
import {Pagination } from 'antd';
import grammarService from "~/services/grammarService";
import GrammarCard from "~/components/GrammarCard/GrammarCard";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles);

function GrammarsFolder() {
  const { id } = useParams();
  const { getAllGrammars } = grammarService();
  const [listGrammar, setListGrammar] = useState();
  useEffect(() => {
    getAllGrammars().then((res) => {
      setListGrammar(res);
    });
  }, []);
  const renderCard = () => {
    return listGrammar?.map((item, index) => {
      return(
        <div key = {index}>
          <GrammarCard grammar = {item}/>
        </div>
      )
    })
  }
  return (
    <div className={cx("container")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src="https://files.tofugu.com/articles/japanese/2017-04-07-japanese-learning-resources-march-2017/header-5120x.jpg"
        >
        </img>
      </div>
      
      <div className={cx("card-search")}>
        <input type="text" placeholder="Search Grammar" required />
        <Button className={cx("btn-search")}>Search</Button>
      </div>
      <div className={cx("card-level")}>
        <input type="submit" value="N5"/>
        <input type="submit" value="N4"/>
        <input type="submit" value="N3"/>
        <input type="submit" value="N2"/>
        <input type="submit" value="N1"/>
      </div>
      < div className={cx("card-title")}>
        All
        <div className={cx("card-title__detail")}>Grammar</div>
      </div>
      <div className={cx("card-grammar")}>
        {renderCard()}
      </div>
      <Pagination defaultCurrent={1} total={50} className={cx("card-pagination")} />
    </div>
  );
}

export default GrammarsFolder