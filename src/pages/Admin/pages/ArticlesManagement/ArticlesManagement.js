import { Button, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import articlesData from "~/data/articlesData";
import { useEffect, useRef, useState } from "react";
import { Option } from "antd/es/mentions";
import { Link } from "react-router-dom";
import articlesService from "~/services/articlesService";
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <img src={image} alt="Articles Banner" style={{ width: 120 }} />
    ),
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Content",
    dataIndex: "content",
    key: "content",
  },

  {
    title: "Created Date",
    dataIndex: "createdDate",
    key: "createdDate",
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
function ArticlesManagement() {
  const [searchText, setSearchText] = useState("");
  const [articlesData, setArticleData] = useState([]);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleResetFilters = () => {
    setSearchText("");
  };
  const { getAllArticles } = articlesService();

  useEffect(() => {
    getAllArticles().then((res) => {
      setArticleData(res);
      console.log(res);
    });
  }, []);

  const filteredArticles = articlesData.filter((articles) => {
    return articles.title.toLowerCase().includes(searchText.toLowerCase());
  });
  const tableRef = useRef(null);
  const handlePageChange = (pageNumber) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by title"
          value={searchText}
          onChange={handleSearchTextChange}
          style={{ width: 200, marginRight: 16 }}
        />
        <Link to="/admin/articles/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Insert
          </Button>
        </Link>
      </div>
      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={filteredArticles}
          pagination={{ pageSize: 2, onChange: handlePageChange }}
        />
      </div>
    </div>
  );
}

export default ArticlesManagement;
