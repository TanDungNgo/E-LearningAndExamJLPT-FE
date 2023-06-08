import classNames from "classnames/bind";
import styles from "./ArticleFolder.module.scss";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button/Button";
import {Pagination, Space, Spin } from 'antd';
import ArticleCard from "~/components/ArticleCard/ArticleCard";
import { useParams } from "react-router-dom";
import articlesService from "~/services/articlesService";
const cx = classNames.bind(styles);

function ArticleFolder() {
  const { getAllArticles, searchArticle } = articlesService();
  const [listArticle, setListArticle] = useState();
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    getAllArticles().then((res) => {
      setListArticle(res);
    });
  }, []);

  useEffect(() => {
    // console.log("Search");
    fetchData();
  }, [currentPage, keyword]);

  const fetchData = () => {
    searchArticle(keyword)
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
      <div className={cx("card-article")}>
        {paginatedData.map((item, index) => {
          console.log(paginatedData)
          return (
            <div className={cx("list-item")} key={index}>
              <ArticleCard article={item} />
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
          src="/images/brg-article.png"
        >
        </img>
      </div>
      
      <div className={cx("card-search")}>
        <input 
              type="text" 
              placeholder="Search Article"  
              required
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)} />
        <Button className={cx("btn-search")} onClick={handleSearch}>Search</Button>
      </div>
      <div id="scroll-target"></div>
      <div className={cx("card-title")}>
        SOME OF OUR ARTICLES
      </div>
      <div className={cx("card-article")}>
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
      </div>
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

export default ArticleFolder