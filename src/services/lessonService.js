import { notification } from "antd";
import RequestHttp from "~/utils/request";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import routes from "~/configs/routes";
function LessonService() {
  const navigate = useNavigate();
  const { request } = RequestHttp();
  const createLesson = async (lesson, role) => {
    try {
      await request.post("/lessons", lesson).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            if (role === "admin") {
              navigate(routes.lessonManagement);
            }
            else  {
              navigate(routes.courseCreated);
            }
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
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
  const deleteComment = async (idComment) => {
    try {
      await request.delete(`/comments/${idComment}`).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            // navigate(routes.lesson);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    createLesson,
    getAllLesson,
    getLessonById,
    getCommentByLessonId,
    commentLesson,
    completedLesson,
    deleteComment,
  };
}

export default LessonService;
