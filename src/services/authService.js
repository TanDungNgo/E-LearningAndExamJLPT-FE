import { notification } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import routes from "~/configs/routes";
import { loginFailed, loginSuccess } from "~/redux/authSlice";
import RequestHttp from "~/utils/request";

function AuthService() {
  const { request, setToken } = RequestHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = async (userData) => {
    console.log(userData);
    try {
      await request.post("/auth/signup", userData).then((res) => {
        notification.success({
          message: "Success",
          description: res.data.message,
        });
        navigate(routes.signin);
      });
    } catch (error) {
      console.log("error", error.response.data);
      notification.error({
        message: "Error",
        description: error.response.data.message,
      });
    }
  };
  const login = async (username, password) => {
    try {
      await request
        .post("/auth/signin", {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.data.data.token) {
            // Swal.fire({
            //   icon: "success",
            //   text: res.data.message,
            //   title: "Success!",
            // }).then(() => {
            //   navigate("/");
            //   // dispatch(loginSuccess(res.data.data));
            //   setToken(res.data.data.token);
            // });
            notification.success({
              message: res.data.message,
              description: `Welcome ${res.data.data.firstname}!`,
            });
            setToken(res.data.data.token);
            navigate(routes.home);
          }
        });
    } catch (err) {
      // dispatch(loginFailed());
      // Swal.fire({
      //   icon: "error",
      //   text: "Username or password is incorrect!",
      //   title: "Error!",
      // });
      console.log(err);
      notification.error({
        message: "Error",
        description: "Username or password is incorrect!",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const getCurrentUser = async () => {
    try {
      const res = await request.get(`/auth/info`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const changePassword = async (data) => {
    try {
      const res = await request.put(`/auth/change`, data);
      if (res.data.status === "ok") {
        notification.success({
          message: "Success",
          description: res.data.message,
        });
        navigate(routes.publicProfile);
      } else {
        notification.error({
          message: "Error",
          description: "Password is incorrect!",
        });
      }
    } catch (error) {
      console.log("error", error.response.data);
      notification.error({
        message: "Error",
        description: error.response.data.message,
      });
    }
  };
  const checkLogin = async () => {
    try {
      const res = await request.get(`/auth/info`);
      if (res.data.data) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkAdmin = async () => {
    try {
      const res = await request.get(`/auth/info`);
      if (res.data.data.role === "admin") {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkTeacher = async () => {
    try {
      const res = await request.get(`/auth/info`);
      if (res.data.data.role === "teacher") {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { register, login, logout, getCurrentUser, changePassword };
}

export default AuthService;
