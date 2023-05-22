import RequestHttp from "~/utils/request";

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

  return {
    getAllArticles,
    getArticleById,
  };
}

export default articlesService;
