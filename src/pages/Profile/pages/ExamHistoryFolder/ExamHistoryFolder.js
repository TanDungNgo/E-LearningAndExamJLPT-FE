import { Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import examResultService from "~/services/examResultService";

function ExamHistoryFolder() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/profileUser/examHistoryFolder/examHistory/${id}`}>{id}</Link>,
    },
    {
      title: "Name",
      dataIndex: "examId",
      key: "name",
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
    },
  ];
  const { getExamResultByStudent } = examResultService();
  const [examResultData, setExamResultData] = useState([]);

  useEffect(() => {
    getExamResultByStudent().then((res) => {
      setExamResultData(res);
    });
  }, []);

  const filterdExamResult = examResultData;

  const tableRef = useRef(null);
  const handlePageChange = (pageNumber) => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div>
      <div ref={tableRef}>
        <Table
          columns={columns}
          dataSource={filterdExamResult}
          pagination={{ pageSize: 10, onChange: handlePageChange }}
        />
      </div>
    </div>
  );
}
export default ExamHistoryFolder;
