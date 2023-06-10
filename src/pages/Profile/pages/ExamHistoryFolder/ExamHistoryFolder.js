import { Table } from "antd";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import examResultService from "~/services/examResultService";

function ExamHistoryFolder() {
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "examId",
      key: "name",
      render: (text, record) => (
        <Link to={`/profileUser/examHistoryFolder/examHistory/${record.id}`}>
          {text}
        </Link>
      ),
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Exam Date",
      dataIndex: "examDate",
      key: "examDate",
      render: (text, record) => (
        <div>{moment(text).format("MMMM DD, YYYY")}</div>
      ),
    },
  ];
  const { getExamResultByStudent } = examResultService();
  const [examResultData, setExamResultData] = useState([]);
  const tableRef = useRef(null);
  const handlePageChange = (pageNumber) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    getExamResultByStudent().then((res) => {
      const dataWithKey = res.map((item) => ({ ...item, key: item.id }));
      setExamResultData(dataWithKey);
    });
  }, []);
  return (
    <div>
      <Table
        ref={tableRef}
        columns={columns}
        dataSource={examResultData}
        pagination={{ pageSize: 10, onChange: handlePageChange }}
      />
    </div>
  );
}
export default ExamHistoryFolder;
