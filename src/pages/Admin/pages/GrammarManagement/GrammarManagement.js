import { Button, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import grammarData from "~/data/grammarData";
import { useEffect, useRef, useState } from "react";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import grammarService from "~/services/grammarService";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Text",
    dataIndex: "text",
    key: "text",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Explanation ",
    dataIndex: "explanation",
    key: "explanation ",
  },
  {
    title: "Example",
    dataIndex: "example",
    key: "example",
  },
  {
    title: "Means",
    dataIndex: "means",
    key: "means",
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
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
function GrammarManagement() {
  const [searchText, setSearchText] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const { getAllGrammars } = grammarService();
  const [grammarData, setGrammarData] = useState([]);
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

  const filteredGrammar = grammarData.filter((grammar) => {
    return (
      grammar.text.toLowerCase().includes(searchText.toLowerCase()) &&
      (filterLevel ? grammar.level === filterLevel : true)
    );
  });

  useEffect(() => {
    getAllGrammars().then((res) => {
      setGrammarData(res);
    });
  }, []);
  const tableRef = useRef(null);
  const handlePageChange = (pageNumber) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
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
        <Link to="/admin/grammar/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Insert
          </Button>
        </Link>
      </div>
      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={filteredGrammar}
          pagination={{ pageSize: 6, onChange: handlePageChange }}
        />
      </div>
    </div>
  );
}

export default GrammarManagement;
