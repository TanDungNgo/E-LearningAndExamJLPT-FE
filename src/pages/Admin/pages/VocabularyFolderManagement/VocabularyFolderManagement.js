import { Button, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ExportOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import vocabularyFolderService from "~/services/vocabularyFolderService";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";
import XLSX from 'xlsx/dist/xlsx.full.min';

function VocabularyFolderManagement() {
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
      render: (text, record) => (
        <Link to={`/admin/vocabularyfolder/${record.id}`}>{text}</Link>
      ),
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
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Link to={`/admin/vocabularyFolder/edit/${id}`}>
            <EditOutlined
              style={{ fontSize: "20px", marginLeft: "10px", color: "#0a9a41" }}
            />
          </Link>
          <DeleteOutlined
            onClick={() => handleDeleteVocabularyFolder(id)}
            style={{ fontSize: "20px", marginLeft: "10px", color: "#f40808" }}
          />
        </Space>
      ),
    },
  ];

  const {getAllVocabularyFolder, deleteVocabularyFolder} = vocabularyFolderService();
  const [vocabularyFolderData, setVocabularyFolderData] = useState([]);

  useEffect(() => {
    getAllVocabularyFolder().then((res) =>{
      setVocabularyFolderData(res);
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

  const filteredvocabularyFolder = vocabularyFolderData.filter((vocabularyFolder) => {
    return (
      vocabularyFolder.title.toLowerCase().includes(searchText.toLowerCase()) &&
      (filterLevel ? vocabularyFolder.level === filterLevel : true)
    );
  });

  const handleDeleteVocabularyFolder = (id) => {
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
        deleteVocabularyFolder(id).then((res) => {
          getAllVocabularyFolder().then((res) => {
            setVocabularyFolderData(res);
          });
        });
      }
    });
  };
  const handleExport = () => {
    // Get the table data
    const dataSource = filteredvocabularyFolder;

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
          <Button type="primary" style={{ marginRight: 15 }} icon={<PlusOutlined />}>
            Insert
          </Button>
        </Link>

        <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
          Export
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredvocabularyFolder}
        pagination={{ pageSize: 6}}
      />
    </div>
  );
}
export default VocabularyFolderManagement;
