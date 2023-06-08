import { Button, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import examData from "~/data/examData";
import examService from "~/services/examService";
import { saveAs } from "file-saver";
import XLSX from 'xlsx/dist/xlsx.full.min';
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <Link to="/admin/question">{text}</Link>,
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
function ExamManagement() {
  const { getAllExam } = examService();
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    getAllExam().then((res) => {
      setExamData(res);
    });
  }, []);
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

  const filterdExam = examData.filter((exam) => {
    return (
      exam.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (filterLevel ? exam.level === filterLevel : true)
    );
  });
  const tableRef = useRef(null);
  const handlePageChange = (pageNumber) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleExport = () => {
    // Get the table data
    const dataSource = filterdExam;

    // Prepare the worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataSource);

    // Prepare the workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Convert the workbook to a binary string
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Create a Blob from the binary string
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Save the file
    saveAs(blob, "courses_data.xlsx");
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
        <Link to="/admin/exam/add">
          <Button type="primary" style={{ marginRight: 15 }} icon={<PlusOutlined />}>
            Insert
          </Button>
        </Link>

        <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
          Export
        </Button>
      </div>
      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={filterdExam}
          pagination={{ pageSize: 10, onChange: handlePageChange }}
        />
      </div>
    </div>
  );
}
export default ExamManagement;
