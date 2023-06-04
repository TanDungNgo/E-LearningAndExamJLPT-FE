import RequestHttp from "~/utils/request";

function examResultService() {
  const { request } = RequestHttp();

  const getAllExamResult = async () => {
    try {
      const res = await request.get(`/exams/exam-result/all`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getExamResultByStudent = async () => {
    try {
      const res = await request.get(`/exams/exam-result/student`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
  const getExamResultById = async (id) => {
    try {
      const res = await request.get(`/exams/exam-result/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    getAllExamResult,
    getExamResultByStudent,
    getExamResultById,
  };
}

export default examResultService;
