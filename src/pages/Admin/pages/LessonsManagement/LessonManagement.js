import { Button, Rate, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import lessonData from "~/data/lessonData";
import { useEffect, useRef, useState } from "react";
import { Option } from "antd/es/mentions";
import { Link } from "react-router-dom";
import lessonService from "~/services/lessonService";
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

  // {
  //   title: "URL Video",
  //   dataIndex: "urlVideo",
  //   key: "urlVideo",
  // },

  // {
  //   title: "URL Video",
  //   dataIndex: "urlVideo",
  //   key: "urlVideo",
  //   render: (text) => <div style={{ wordBreak: "break-all" }}>{text}</div>
  // },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
    // render: (_, record) => (
    //   <Space size="middle">
    //     <a>
    //       <Rate
    //         style={{ fontSize: "20px", marginLeft: "10px", color: "#0a9a41" }}
    //       />
    //     </a>
    //   </Space>
    // ),
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
          <Button type="primary" icon={<PlusOutlined />}>
            Insert
          </Button>
        </Link>
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
