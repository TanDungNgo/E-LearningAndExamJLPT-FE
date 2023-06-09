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
              navigate(`/profileUser/updateCourse/:idCourse`);
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
  const getLessonByCourse = async (id) => {
    try {
      const res = await request.get(`/lessons/course/${id}`);
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
  const updateLesson = async (id, lesson, role) => {
    try {
      await request.put(`/lessons/${id}`, lesson).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            if (role === "admin") {
              navigate(routes.lessonManagement);
            }
            else {
              
            }
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
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
  const deleteLesson = async (id, role) => {
    try {
      await request.delete(`/lessons/${id}`).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            if (role === "admin") {
              navigate(routes.lessonManagement);
            }
            else {
              navigate(`/profileUser/updateCourse/:idCourse/listLesson/:idLesson`);
            }
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
    getLessonByCourse,
    getCommentByLessonId,
    updateLesson,
    commentLesson,
    completedLesson,
    deleteComment,
    deleteLesson,
  };
}

export default LessonService;
