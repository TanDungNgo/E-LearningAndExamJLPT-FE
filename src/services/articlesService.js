import RequestHttp from "~/utils/request";
import Swal from "sweetalert2";
function articlesService() {
  const { request } = RequestHttp();
  const getAllArticles = async () => {
    try {
      const res = await request.get("/articles/all");
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
    getAllArticles,
    getArticleById,
    createArticle,
  };
}

export default articlesService;
