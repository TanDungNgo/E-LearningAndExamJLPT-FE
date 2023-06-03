import { Button, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import courseService from "~/services/courseService";
import routes from "~/configs/routes";
import Swal from "sweetalert2";

function CourseManagement() {
  const { getAllCourse, deleteCourse } = courseService();
  const [courseData, setCourseData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  useEffect(() => {
    getAllCourse().then((res) => {
      setCourseData(res);
    });
  }, []);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterTypeChange = (value) => {
    setFilterType(value);
  };

  const handleFilterLevelChange = (value) => {
    setFilterLevel(value);
  };

  const handleFilterPriceChange = (value) => {
    setFilterPrice(value);
  };

  const handleResetFilters = () => {
    setSearchText("");
    setFilterType("");
    setFilterLevel("");
    setFilterPrice("");
  };

  const filteredCourses = courseData.filter((course) => {
    return (
      course.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (filterType ? course.type === filterType : true) &&
      (filterLevel ? course.level === filterLevel : true) &&
      (filterPrice ? course.price <= filterPrice : true)
    );
  });
  const tableRef = useRef(null);
  const handlePageChange = (pageNumber) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleDeleteCourse = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourse(id).then((res) => {
          getAllCourse().then((res) => {
            setCourseData(res);
          });
        });
      }
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Banner",
      dataIndex: "banner",
      key: "banner",
      render: (banner) => (
        <img src={banner} alt="Course Banner" style={{ width: 100 }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price}`,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Link to={`/admin/course/edit/${id}`}>
            <EditOutlined
              style={{ fontSize: "20px", marginLeft: "10px", color: "#0a9a41" }}
            />
          </Link>
          <DeleteOutlined
            onClick={() => handleDeleteCourse(id)}
            style={{ fontSize: "20px", marginLeft: "10px", color: "#f40808" }}
          />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by name"
          value={searchText}
          onChange={handleSearchTextChange}
          style={{ width: 200, marginRight: 16 }}
        />
        <Select
          placeholder="Filter by type"
          value={filterType}
          onChange={handleFilterTypeChange}
          style={{ width: 120, marginRight: 16 }}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="JLPT">JLPT</Select.Option>
          <Select.Option value="Kaiwa">Kaiwa</Select.Option>
        </Select>
        <Select
          placeholder="Filter by level"
          value={filterLevel}
          onChange={handleFilterLevelChange}
          style={{ width: 120, marginRight: 16 }}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="N1"> N1</Select.Option>
          <Select.Option value="N2">N2</Select.Option>
          <Select.Option value="N3">N3</Select.Option>
          <Select.Option value="N4">N4</Select.Option>
          <Select.Option value="N5">N5</Select.Option>
        </Select>
        <Select
          placeholder="Filter by price"
          value={filterPrice}
          onChange={handleFilterPriceChange}
          style={{ width: 150, marginRight: 16 }}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="50">Less than $20</Select.Option>
          <Select.Option value="100">Less than $50</Select.Option>
          <Select.Option value="200">Less than $100</Select.Option>
        </Select>
        <Button
          type="primary"
          icon={
            <FontAwesomeIcon
              icon={faFilterCircleXmark}
              style={{ marginRight: "5px" }}
            />
          }
          onClick={handleResetFilters}
          style={{ marginRight: 16 }}
        >
          Reset Filters
        </Button>
        <Link to={routes.addCourse}>
          <Button type="primary" icon={<PlusOutlined />}>
            Insert
          </Button>
        </Link>
      </div>
      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={filteredCourses}
          pagination={{ pageSize: 4, onChange: handlePageChange }}
          rowKey={(record) => record.id}
        />
      </div>
    </div>
  );
}

export default CourseManagement;
