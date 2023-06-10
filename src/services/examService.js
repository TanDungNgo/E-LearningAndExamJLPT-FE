import routes from "~/configs/routes";
import RequestHttp from "~/utils/request";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ExamService() {
  const { request } = RequestHttp();
  const navigate = useNavigate();

  const getAllExam = async () => {
    try {
      const res = await request.get("/exams/all");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getExam = async (level) => {
    try {
      const res = await request.get(`/exams/level/${level}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const submitExam = async (examId, answers) => {
    // console.log(answers);
    try {
      const res = await request.post(`/exams/submit/${examId}`, answers);
      // console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomExamByLevel = async (level) => {
    try {
      const res = await request.get(`/exams/level/${level}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getExamById = async (id) => {
    try {
      const res = await request.get(`/exams/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const createQuestion = async (question) => {
    try {
      const res = await request.post(`/questions`, question);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createExam = async (exam) => {
    try {
      await request.post("/exams/create", exam).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.examManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateExam = async (id, exam) => {
    try {
      await request.put(`/exams/update/${id}`, exam).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.examManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExam = async (id) => {
    try {
      await request.delete(`/exams/delete/${id}`).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.examManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  

  return {
    getAllExam,
    getExam,
    submitExam,
    getRandomExamByLevel,
    getExamById,
    createQuestion,
    createExam,
    updateExam,
    deleteExam,
  };
}

export default ExamService;
