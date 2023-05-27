import { Button, Select, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import examData from "~/data/examData";
import examService from "~/services/examService";

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
        title: "Text",
        dataIndex: "text",
        key: "text",
    },
    {
        title: "Image",
        dataIndex: "image",
        key: "image",
    },
    {
        title: "Audio",
        dataIndex: "audioFile",
        key: "audioFile",
    },
    {
        title: "Option1",
        dataIndex: "option1",
        key: "option1",
    },
    {
        title: "Option2",
        dataIndex: "option2",
        key: "option2",
    },
    {
        title: "Option3",
        dataIndex: "option3",
        key: "option3",
    },
    {
        title: "Option4",
        dataIndex: "option4",
        key: "option4",
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

    const { getRandomExamByLevel } = examService();
    const [questionData, setQuestionData] = useState([]);

    useEffect(() => {
        getRandomExamByLevel().then((res) => {
            setQuestionData(res);
        });
    }, []);
    const [searchText, setSearchText] = useState("");

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const filterdExam = examData.filter((exam) => {
        return (
            exam.text.toLowerCase().includes(searchText.toLowerCase())

        );
    });
    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Search by text"
                    value={searchText}
                    onChange={handleSearchTextChange}
                    style={{ width: 200, marginRight: 16 }}
                />
                <Link to="/admin/question/add">
                    <Button type="primary" icon={<PlusOutlined />}>
                        Insert
                    </Button>
                </Link>
            </div>
            <Link to="/admin/question">
                <Table
                    columns={columns}
                    dataSource={filterdExam}
                    pagination={{ pageSize: 10 }}
                />
            </Link>
        </div>
    );
}
export default ExamManagement;
