import { notification } from "antd";
import Swal from "sweetalert2";
import RequestHttp from "~/utils/request";

function courseService() {
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
            window.location.reload();
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
            window.location.reload();
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
            window.location.reload();
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
      await request.post(`/enroll/${id}`).then((res) => {
        if (res.data.status === "ok") {
          notification.success({
            message: "Success!",
            description: res.data.message,
          });
          window.location.reload();
        } else {
          notification.error({
            message: "Error!",
            description: "Failed to enroll!",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createCourse,
    getAllCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
    getSuggestedCourses,
    checkEnroll,
    enrollCourse,
  };
}

export default courseService;
