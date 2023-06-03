import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import routes from "~/configs/routes";
import RequestHttp from "~/utils/request";

function CourseService() {
  const navigate = useNavigate();
  const { request } = RequestHttp();
  const createCourse = async (course) => {
    try {
      await request.post("/courses", course).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.courseManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getAllCourse = async () => {
    try {
      const res = await request.get("/courses/all");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getCourseById = async (id) => {
    try {
      const res = await request.get(`/courses/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const updateCourse = async (id, course) => {
    try {
      await request.put(`/courses/${id}`, course).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.courseManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCourse = async (id) => {
    try {
      await request.delete(`/courses/${id}`).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.courseManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSuggestedCourses = async () => {
    try {
      const res = await request.get("/courses/suggest");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getMyCourse = async () => {
    try {
      const res = await request.get("/courses/my-courses");
      console.log("[Couese]", res.data.data);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const checkEnroll = async (id) => {
    try {
      const res = await request.get(`/enroll/check/${id}`);
      if (res.data.message === "Enrolled!") {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  const enrollCourse = async (id) => {
    try {
      const res = await request.post(`/enroll/${id}`);
      if (res.data.status === "ok") {
        notification.success({
          message: "Success!",
          description: res.data.message,
        });
        return true;
      } else {
        notification.error({
          message: "Error!",
          description: "Failed to enroll!",
        });
        return false;
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error!",
        description: "Failed to enroll!",
      });
      return false;
    }
  };

  return {
    createCourse,
    getAllCourse,
    getCourseById,
    getMyCourse,
    updateCourse,
    deleteCourse,
    getSuggestedCourses,
    checkEnroll,
    enrollCourse,
  };
}

export default CourseService;
