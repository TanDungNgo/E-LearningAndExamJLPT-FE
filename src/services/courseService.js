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
  return { createCourse };
}

export default courseService;
