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
      const res = await request.get("/courses");
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

  return {
    createCourse,
    getAllCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
  };
}

export default courseService;