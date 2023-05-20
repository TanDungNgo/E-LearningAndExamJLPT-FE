import { notification } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
        // console.log(res.data.message);
        Swal.fire({
          icon: "success",
          text: res.data.message,
          title: "Success!",
        }).then(() => {
          navigate("/login");
        });
      });
    } catch (err) {
      console.log(err);
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
            navigate("/");
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

  return { register, login, logout, getCurrentUser };
}

export default AuthService;
