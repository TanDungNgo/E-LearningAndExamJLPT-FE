import { Button, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import vocabularyFolderService from "~/services/vocabularyFolderService";
import Swal from "sweetalert2";


function VocabularyManagement() {
  const { idFolder} = useParams();
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
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id) => (
        <Space size="middle">
          <Link to={`/admin/vocabularyfolder/${idFolder}/vocabulary/edit/${id}`}>
            <EditOutlined
              style={{ fontSize: "20px", marginLeft: "10px", color: "#0a9a41" }}
            />
          </Link>
          <DeleteOutlined
            onClick={() => handleDeleteVocabulary(id)}
            style={{ fontSize: "20px", marginLeft: "10px", color: "#f40808" }}
          />
        </Space>
      ),
    },
  ];
  const { getVocabularyFolderById, deleteVocabulary, getAllVocabulary} = vocabularyFolderService();
  const [listVocabularies, setListVocabularies] = useState([]);
  const [vocabularyFolder, setVocabularyFolder] = useState();
  const [vocabularyData, setVocabularyData] = useState([]);

  useEffect(() => {
    getVocabularyFolderById(idFolder).then((res) => {
      setVocabularyFolder(res);
      console.log(res);
      setListVocabularies(res.vocabularies);
      console.log(res.vocabularies)
    });
  }, []);


  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredVocabulary = listVocabularies.filter((vocabulary) => {
    return vocabulary.meaning.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleDeleteVocabulary = (idVocabulary) => {
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
        deleteVocabulary(idVocabulary, idFolder).then((res) => {
          getVocabularyFolderById(idFolder).then((res) => {
            setVocabularyFolder(res);
            console.log(res);
            setListVocabularies(res.vocabularies);
            console.log(res.vocabularies)
          });
        });
      }
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by meaning"
          value={searchText}
          onChange={handleSearchTextChange}
          style={{ width: 200, marginRight: 16 }}
        />
        <Link to={`/admin/vocabularyfolder/${idFolder}/vocabulary/add`}>
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