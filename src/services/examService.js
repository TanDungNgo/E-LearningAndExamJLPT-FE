import RequestHttp from "~/utils/request";

function examService() {
  const { request } = RequestHttp();
  const getExam = async (level) => {
    try {
      const res = await request.get(`/exams/level/${level}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const submitExam = async (examId, answers) => {
    try {
      const res = await request.post(`/exams/submit/${examId}`, answers);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getExam,
    submitExam,
  };
}

export default examService;
