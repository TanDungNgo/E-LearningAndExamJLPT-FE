import classNames from "classnames/bind";
import styles from "./AllCourse.module.scss";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button/Button";
import CourseCard from "~/components/CourseCard/CourseCard";
import { Input, List, Pagination, Select, Space, Spin } from "antd";
import courseService from "~/services/courseService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

function AllCourse() {
  const { searchCourse } = courseService();
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalElements, setTotalElements] = useState(0);
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    // console.log("Search");
    fetchData();
  }, [currentPage, keyword, type, level]);

  const fetchData = () => {
    searchCourse(keyword,type,level)
      .then((response) => {
        setData(response);
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
      <div className={cx("card-course")}>
        {paginatedData.map((item, index) => {
          return (
            <div className={cx("list-item")} key={index}>
              <CourseCard course={item} />
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
  const handleResetFilters = () => {
    setKeyword("");
    setType("");
    setLevel("");
  };
  return (
    <div className={cx("container")}>
      <div className={cx("card-img")}>
        <img
          className={cx("card-img__detail")}
          src="/images/bg_allcourse.jpg"
        ></img>
      </div>
      <div className={cx("card-search")}>
        <input
          type="text"
          placeholder="Search your favourite course"
          required
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button className={cx("btn-search")} onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div className={cx("card-select")}>
        <Select placeholder="Level" className={cx("card-select__level")}
          onChange={(value) => {
            setLevel(value);
          }}
          value={level}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="N5">N5</Select.Option>
          <Select.Option value="N4">N4</Select.Option>
          <Select.Option value="N3">N3</Select.Option>
          <Select.Option value="N2">N2</Select.Option>
          <Select.Option value="N1">N1</Select.Option>
        </Select>
        <Select placeholder="Type" className={cx("card-select__learning")}
          onChange={(value) => {
            setType(value);
          }}
          value={type}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="Kaiwa">Kaiwa</Select.Option>
          <Select.Option value="JLPT">JLPT</Select.Option>
        </Select>
        <Button
          onClick={handleResetFilters}
          primary
          leftIcon={
            <FontAwesomeIcon
              icon={faFilterCircleXmark}
              style={{ marginRight: "5px" }}
            />
          }
          style={{ height: "32px" }}
        >
          Reset Filters
        </Button>
      </div>
      {!data ? (
        <Space style={{ marginTop: "100px" }}>
          <Spin tip="Loading" size="large">
          </Spin>
        </Space>
      ) : (
        <>
        <div id="scroll-target"></div>
        {renderData()}
        </>
      )}
      <Pagination
        className={cx("card-pagination")}
        current={currentPage}
        pageSize={pageSize}
        total={totalElements}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default AllCourse;
