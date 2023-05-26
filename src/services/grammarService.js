import RequestHttp from "~/utils/request";

function grammarService() {
  const { request } = RequestHttp();
  const getAllGrammars = async () => {
    try {
      const res = await request.get("/grammars/all");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getGrammarById = async (id) => {
    try {
      const res = await request.get(`/grammars/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    getAllGrammars,
    getGrammarById,
  };
}

export default grammarService;
