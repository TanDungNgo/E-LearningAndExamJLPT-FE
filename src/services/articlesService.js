import RequestHttp from "~/utils/request";
import Swal from "sweetalert2";
import routes from "~/configs/routes";
import { useNavigate } from "react-router-dom";
function ArticlesService() {
  
  const navigate = useNavigate();
  const { request } = RequestHttp();
  const getAllArticles = async () => {
    try {
      const res = await request.get("/articles/all");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getNewArticles = async () => {
    try {
      const res = await request.get("/articles/new");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getArticleById = async (id) => {
    try {
      const res = await request.get(`/articles/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const createArticle = async (article) => {
    try {
      await request.post("/articles", article).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.articlesManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateArticle = async (id, article) => {
    try {
      await request.put(`/articles/${id}`, article).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.articlesManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async (id) => {
    try {
      await request.delete(`/articles/${id}`).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.articlesManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const searchArticle = async (keyword) => {
    try {
      const res = await request.get(`/articles/search?query=${keyword}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    searchArticle,
    getNewArticles,
  };
}

export default ArticlesService;
