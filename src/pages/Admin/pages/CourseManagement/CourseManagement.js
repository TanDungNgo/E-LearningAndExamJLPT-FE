import { Button, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
// import courseData from "~/data/courseData";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import courseService from "~/services/courseService";
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
    render: (price) => `$${price}`,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>
          <EditOutlined
            style={{ fontSize: "20px", marginLeft: "10px", color: "#0a9a41" }}
          />
        </a>
        <a>
          <DeleteOutlined
            style={{ fontSize: "20px", marginLeft: "10px", color: "#f40808" }}
          />
        </a>
      </Space>
    ),
  },
];
function CourseManagement() {
  const { getAllCourse } = courseService();
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
          <Option value="">All</Option>
          <Option value="JLPT">JLPT</Option>
          <Option value="Kaiwa">Kaiwa</Option>
        </Select>
        <Select
          placeholder="Filter by level"
          value={filterLevel}
          onChange={handleFilterLevelChange}
          style={{ width: 120, marginRight: 16 }}
        >
          <Option value="">All</Option>
          <Option value="N1"> N1</Option>
          <Option value="N2">N2</Option>
          <Option value="N3">N3</Option>
          <Option value="N4">N4</Option>
          <Option value="N5">N5</Option>
        </Select>
        <Select
          placeholder="Filter by price"
          value={filterPrice}
          onChange={handleFilterPriceChange}
          style={{ width: 150, marginRight: 16 }}
        >
          <Option value="">All</Option>
          <Option value="50">Less than $20</Option>
          <Option value="100">Less than $50</Option>
          <Option value="200">Less than $100</Option>
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
        <Link to="/admin/course/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Insert
          </Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={filteredCourses}
        pagination={{ pageSize: 4 }}
      />
    </div>
  );
}

export default CourseManagement;
