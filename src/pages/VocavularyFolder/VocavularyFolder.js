import classNames from "classnames/bind";
import styles from "./VocavularyFolder.module.scss";
import React, { useState } from "react";
import Button from "~/components/Button/Button";
import {Pagination } from 'antd';
import VocabularyFolderCard from "~/components/VocabularyFolderCard/VocabularyFolderCard";
const cx = classNames.bind(styles);

function VocabularyFolder() {
  const [listVocabularyFolder, setListVocabularyFolder] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);
  const renderCard = () => {
    return listVocabularyFolder.map((item, index) => {
      return (
        <div key={index}>
          <VocabularyFolderCard />
        </div>
      );
    });
  };
  return (
    <div className={cx("container")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src="/images/bg_allcourse.jpg"
        >
        </img>
      </div>
      <div className={cx("card-search")}>
        <input type="text" placeholder="Search vocabulary folder" required />
        <Button className={cx("btn-search")}>Search</Button>
      </div>
      <div className={cx("card-select")}>
        <select className={cx("card-select__level")}>
          <option value="N5">N5</option>
          <option value="N4">N4</option>
          <option value="N3">N3</option>
          <option value="N2">N2</option>
          <option value="N1">N1</option>
        </select>
        <select className={cx("card-select__learning")}>
          <option value="">Chapter 1</option>
          <option value="">Chapter 2</option>
          <option value="">Chapter 3</option>
          <option value="">Chapter 4</option>
          <option value="">Chapter 5</option>
        </select>
      </div>
      <div className={cx("card-vocabulary-folder")}>
        {renderCard()}
      </div>
      <Pagination defaultCurrent={1} total={50} className={cx("card-pagination")} />
    </div>
  );
}

export default VocabularyFolder;