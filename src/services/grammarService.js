import RequestHttp from "~/utils/request";
import Swal from "sweetalert2";
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

  const createGrammar = async (grammar) => {
    try {
      await request.post("/grammars", grammar).then((res) => {
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
    getAllGrammars,
    getGrammarById,
    createGrammar,
  };
}

export default grammarService;
