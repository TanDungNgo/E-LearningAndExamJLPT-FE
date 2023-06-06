import { notification } from "antd";
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
  const getCommentByLessonId = async (id) => {
    try {
      const res = await request.get(`/comments/lesson/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const commentLesson = async (data) => {
    try {
      const res = await request.post(`/comments/`, data);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const completedLesson = async (id) => {
    try{
      const res = await request.put(`/lessons/watched/${id}`);

      notification.success({
        message: "Success!",
        description: res.data.message,
      });
      return res.data.data;
    }
    catch(error){
      console.log(error);
    }
  };
  return {
    getAllLesson,
    getLessonById,
    getCommentByLessonId,
    commentLesson,
    completedLesson,
  };
}

export default lessonService;
