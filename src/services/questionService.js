import routes from "~/configs/routes";
import RequestHttp from "~/utils/request";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function QuestionService() {
  const { request } = RequestHttp();
  const navigate = useNavigate();
  const getAllQuestion = async (id) => {
    try {
      const res = await request.get(`/questions/exam/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllQuestion,

  };
}

export default QuestionService;
