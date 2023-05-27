import RequestHttp from "~/utils/request";

function examService() {
  const { request } = RequestHttp();

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
    console.log(answers);
    try {
      const res = await request.post(`/exams/submit/${examId}`, answers);
      console.log(res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomExamByLevel = async(level) => {
    try{
      const res = await request.get(`/exams/level/${level}`);
      return res.data.data;

    }catch(error) {
      console.log(error);
    }
  };

  return {
    getAllExam,
    getExam,
    submitExam,
    getRandomExamByLevel,
  };
}

export default examService;
