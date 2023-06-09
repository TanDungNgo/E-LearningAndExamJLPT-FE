import classNames from "classnames/bind";
import styles from "./VocavularyFolder.module.scss";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button/Button";
import { Pagination, Select, Space, Spin } from 'antd';
import VocabularyFolderCard from "~/components/VocabularyFolderCard/VocabularyFolderCard";
import vocabularyFolderService from "~/services/vocabularyFolderService";
import { useParams } from "react-router-dom";
const cx = classNames.bind(styles);
const { Option } = Select;

function VocabularyFolder() {
  const [listVocabularyFolder, setListVocabularyFolder] = useState();
  const { getAllVocabularyFolder, searchVocabularyFolder } = vocabularyFolderService();
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalElements, setTotalElements] = useState(0);
  useEffect(() => {
    getAllVocabularyFolder().then((res) => {
      // console.log(res);
      setListVocabularyFolder(res);
    });

  }, []);

  useEffect(() => {
    // console.log("Search");
    fetchData();
  }, [currentPage, keyword]);

  const fetchData = () => {
    searchVocabularyFolder(keyword)
      .then((response) => {
        setData(response);
        // console.log(response);
        setTotalElements(response.length);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const renderData = () => {
    // Tính toán các chỉ số phân trang
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    return (
      <div className={cx("card-vocabulary-folder")}>
        {paginatedData.map((item, index) => {
          {/* console.log(paginatedData) */}
          return (
            <div className={cx("list-item")} key={index}>
              <VocabularyFolderCard vocabularyFolder={item} />
            </div>
          );
        })}
      </div>
    );
  };
  useEffect(() => {
    const element = document.getElementById("scroll-target"); // ID của element bạn muốn cuộn đến
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" }); // Cuộn đến vị trí của element
    }
  }, [currentPage]);

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
        <input
          type="text"
          placeholder="Search vocabulary folder"
          required
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onSearch={handleSearch} />
        <Button className={cx("btn-search")} onClick={handleSearch}>Search</Button>
      </div>
      <div id="scroll-target"></div>

        {!data ? (
          <Space style={{ marginTop: "100px" }}>
            <Spin tip="Loading" size="large">
            </Spin>
          </Space>
        ) : (
          <>
            {renderData()}
          </>
        )}

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalElements}
        onChange={handlePageChange}
        className={cx("card-pagination")}
      />
    </div>
  );
}

export default VocabularyFolder;