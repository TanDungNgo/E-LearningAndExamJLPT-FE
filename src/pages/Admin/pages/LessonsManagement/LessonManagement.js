import { Button, Rate, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import lessonService from "~/services/lessonService";
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
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
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



function LessonManagement() {
  const { getAllLesson } = lessonService();
  const [lessonData, setLessonData] = useState([]);

  useEffect(() => {
    getAllLesson().then((res) => {
      setLessonData(res);
    });
  }, []);
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  const filteredLessons = lessonData.filter((lesson) => {
    return lesson.name.toLowerCase().includes(searchText.toLowerCase());
  });
  const tableRef = useRef(null);
  const handlePageChange = (pageNumber) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleExport = () => {
    // Get the table data
    const dataSource = filteredLessons;
  
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
    saveAs(blob, "lesson_data.xlsx");
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
        <Link to="/admin/lesson/add">
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
          dataSource={filteredLessons}
          pagination={{ pageSize: 6, onChange: handlePageChange }}
        />
      </div>
    </div>
  );
}

export default LessonManagement;
