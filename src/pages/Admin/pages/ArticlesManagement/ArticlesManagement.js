import { Button, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined } from "@ant-design/icons";
import { Input } from "antd";
import articlesData from "~/data/articlesData";
import { useEffect, useRef, useState } from "react";
import { Option } from "antd/es/mentions";
import { Link } from "react-router-dom";
import articlesService from "~/services/articlesService";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";
import XLSX from 'xlsx/dist/xlsx.full.min';

function ArticlesManagement() {
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
        <img src={image} alt="Articles Image" style={{ width: 100 }} />
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
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Link to={`/admin/articles/edit/${id}`}>
            <EditOutlined
              style={{ fontSize: "20px", marginLeft: "10px", color: "#0a9a41" }}
            />
          </Link>
          <DeleteOutlined
            onClick={() => handleDeleteArticle(id)}
            style={{ fontSize: "20px", marginLeft: "10px", color: "#f40808" }}
          />
        </Space>
      ),
    },
  ];
  const [searchText, setSearchText] = useState("");
  const [articlesData, setArticleData] = useState([]);
  const {getAllArticles, deleteArticle} = articlesService();

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleResetFilters = () => {
    setSearchText("");
  };

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

  const handleDeleteArticle = (id) => {
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
        deleteArticle(id).then((res) => {
          getAllArticles().then((res) => {
            setArticleData(res);
          });
        });
      }
    });
  };
  const handleExport = () => {
    // Get the table data
    const dataSource = filteredArticles;

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
    saveAs(blob, "article_data.xlsx");
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
          dataSource={filteredArticles}
          pagination={{ pageSize: 2, onChange: handlePageChange }}
        />
      </div>
    </div>
  );
}

export default ArticlesManagement;
