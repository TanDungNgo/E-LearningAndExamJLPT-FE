import classNames from "classnames/bind";
import styles from "./VocavularyFolder.module.scss";
import React, { useState } from "react";
import Button from "~/components/Button/Button";
import {Pagination, Select } from 'antd';
import VocabularyFolderCard from "~/components/VocabularyFolderCard/VocabularyFolderCard";
const cx = classNames.bind(styles);
const { Option } = Select;

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
          src="https://files.tofugu.com/articles/japanese/2022-07-19-what-is-the-jlpt/header-2560x.jpg"
        >
        </img>
      </div>
      <div className={cx("card-search")}>
        <input type="text" placeholder="Search vocabulary folder" required />
        <Button className={cx("btn-search")}>Search</Button>
      </div>
      
      <div className={cx("card-select")}>
        <Select  placeholder="Level" className={cx("card-select__level")}>
          <Option value="N5">N5</Option>
          <Option value="N4">N4</Option>
          <Option value="N3">N3</Option>
          <Option value="N2">N2</Option>
          <Option value="N1">N1</Option>
        </Select>
        <Select placeholder="Chapter" className={cx("card-select__learning")}>
          <Option value="">Chapter 1</Option>
          <Option value="">Chapter 2</Option>
          <Option value="">Chapter 3</Option>
          <Option value="">Chapter 4</Option>
          <Option value="">Chapter 5</Option>
        </Select>
      </div>
      <div className={cx("card-vocabulary-folder")}>
        {renderCard()}
      </div>
      <Pagination defaultCurrent={1} total={50} className={cx("card-pagination")} />
    </div>
  );
}

export default VocabularyFolder;