import { Button, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import vocabularyData from "~/data/vocabularyData";
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
    title: "Text",
    dataIndex: "text",
    key: "text",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Pronunciation",
    dataIndex: "pronunciation",
    key: "pronunciation",
  },
  {
    title: "Spelling",
    dataIndex: "spelling",
    key: "spelling",
  },
  {
    title: "Meaning",
    dataIndex: "meaning",
    key: "meaning",
  },
  {
    title: "Example",
    dataIndex: "example",
    key: "example",
  },
  {
    title: "Audio",
    dataIndex: "audio",
    key: "audio",
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
function VocabularyManagement() {
    const [searchText, setSearchText] = useState("");
  
    const handleSearchTextChange = (event) => {
      setSearchText(event.target.value);
    };

    const filteredVocabulary = vocabularyData.filter((vocabulary) => {
      return (
        vocabulary.meaning.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search by meaning"
            value={searchText}
            onChange={handleSearchTextChange}
            style={{ width: 200, marginRight: 16 }}
          />
          <Link to="/admin/vocabulary/add">
            <Button type="primary" icon={<PlusOutlined />}>
              Insert
            </Button>
          </Link>
        </div>
        <Table
          columns={columns}
          dataSource={filteredVocabulary}
          pagination={{ pageSize: 6 }}
        />
      </div>
    );
  }
  
  export default VocabularyManagement;
