import RequestHttp from "~/utils/request";
import Swal from "sweetalert2";
function usersService() {
  const { request } = RequestHttp();
  const getAllUser = async () => {
    try {
      const res = await request.get("/users");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getUserById = async (id) => {
    try {
      const res = await request.get(`/users/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return {
    getAllUser,
    getUserById,
  };
}

export default usersService;
