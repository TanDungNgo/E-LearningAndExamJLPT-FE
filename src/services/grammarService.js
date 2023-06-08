import RequestHttp from "~/utils/request";
import Swal from "sweetalert2";
import routes from "~/configs/routes";
import { useNavigate } from "react-router-dom";
function GrammarService() {
  const { request } = RequestHttp();
  const navigate = useNavigate();
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

  const updateGrammar = async (id, grammar) => {
    try {
      await request.put(`/grammars/${id}`, grammar).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.grammarManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGrammar = async (id) => {
    try {
      await request.delete(`/grammars/${id}`).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.grammarManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const searchGrammar = async (keyword) => {
    try {
      const res = await request.get(`/grammars/search?query=${keyword}`);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllGrammars,
    getGrammarById,
    createGrammar,
    updateGrammar,
    deleteGrammar,
    searchGrammar,
  };
}

export default GrammarService;
