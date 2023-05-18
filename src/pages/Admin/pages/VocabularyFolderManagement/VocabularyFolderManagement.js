import { Button, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import courseData from "~/data/courseData";
import { useState } from "react";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import vocabularyFolderData from "~/data/vocabularyFolderData";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Count",
    dataIndex: "count",
    key: "count",
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
function VocabularyFolderManagement() {
  const [searchText, setSearchText] = useState("");
  const [filterLevel, setFilterLevel] = useState("");

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFilterLevelChange = (value) => {
    setFilterLevel(value);
  };
  const handleResetFilters = () => {
    setSearchText("");
    setFilterLevel("");
  };

  const filteredvocabularyFolder = vocabularyFolderData.filter((vocabularyFolder) => {
    return (
      vocabularyFolder.title.toLowerCase().includes(searchText.toLowerCase()) &&
      (filterLevel ? vocabularyFolder.level === filterLevel : true)
    );
  });
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by title"
          value={searchText}
          onChange={handleSearchTextChange}
          style={{ width: 200, marginRight: 16 }}
        />
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
        <Link to="/admin/vocabularyFolder/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Insert
          </Button>
        </Link>
      </div>
      <Link to = "/admin/vocabulary">
      <Table
        columns={columns}
        dataSource={filteredvocabularyFolder}
        pagination={{ pageSize: 8}}
      />
      </Link>
    </div>
  );
}
export default VocabularyFolderManagement;