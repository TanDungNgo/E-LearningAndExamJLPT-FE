
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

  return {
    getAllArticles,
  };
}

export default articlesService;
