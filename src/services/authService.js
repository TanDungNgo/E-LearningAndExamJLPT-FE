import { notification } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "~/configs/routes";
import { loginFailed, loginSuccess } from "~/redux/authSlice";
import RequestHttp from "~/utils/request";
import Swal from "sweetalert2";

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
            notification.success({
              message: res.data.message,
              description: `Welcome ${res.data.data.firstname}!`,
            });
            setToken(res.data.data.token);
            const roles = res.data.data.roles;
            console.log(roles[0].authority);
            if (roles[0].authority === "ADMIN") {
              navigate(routes.admin);
            } else {
              navigate(routes.home);
            }
          }
        });
    } catch (err) {
      console.log(err);
      dispatch(loginFailed());
      notification.error({
        message: "Error",
        description: "Username or password is incorrect!",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(loginFailed());
    navigate(routes.home);
    window.location.reload();
  };

  const getCurrentUser = async () => {
    try {
      const res = await request.get(`/auth/info`);
      dispatch(loginSuccess(res.data.data));
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
  const updateProfile = async (userData) => {
    try {
      await request.put(`/auth/update`, userData).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            dispatch(loginSuccess(res.data.data));
            navigate(routes.publicProfile);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return {
    register,
    login,
    logout,
    getCurrentUser,
    changePassword,
    updateProfile,
  };
}

export default AuthService;
