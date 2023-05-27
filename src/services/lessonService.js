import Swal from "sweetalert2";
import RequestHttp from "~/utils/request";

function lessonService() {
  const { request } = RequestHttp();
  const getAllLesson = async () => {
    try {
      const res = await request.get("/lessons");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getLessonById = async (id) => {
    try {
      const res = await request.get(`/lessons/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return {
    getAllLesson,
    getLessonById,
  };
}

export default lessonService;
