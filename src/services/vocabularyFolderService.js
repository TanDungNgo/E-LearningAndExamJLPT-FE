import RequestHttp from "~/utils/request";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import routes from "~/configs/routes";
function VocabularyFolderService() {
  const { request } = RequestHttp();
  const navigate = useNavigate();
  
  const getAllVocabularyFolder = async () => {
    try {
      const res = await request.get("/vocabularyFolders/all");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getAllVocabulary = async () => {
    try {
      const res = await request.get("/vocabularies/all");
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const getVocabularyFolderById = async (id) => {
    try {
      const res = await request.get(`/vocabularyFolders/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const getNextVocabularyFolders = async (id) => {
    try {
      const res = await request.get(`/vocabularyFolders/next/${id}`);
      // console.log("[VocabularyFolder]", res.data)
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const getVocabularyById = async (id) => {
    try {
      const res = await request.get(`/vocabularies/${id}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const createVocabularyFolder = async (vocabularyFolders) => {
    try {
      await request.post("/vocabularyFolders", vocabularyFolders).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.vocabularyFolderManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createVocabulary = async (vocabularies) => {
    try {
      await request.post("/vocabularies", vocabularies).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.vocabularyManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateVocabularyFolder = async (id, vocabularyFolder) => {
    try {
      await request.put(`/vocabularyFolders/${id}`, vocabularyFolder).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.vocabularyFolderManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteVocabularyFolder = async (id) => {
    try {
      await request.delete(`/vocabularyFolders/${id}`).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.vocabularyFolderManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateVocabulary = async (id, vocabulary) => {
    try {
      await request.put(`/vocabularies/${id}`, vocabulary).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(routes.vocabularyManagement);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteVocabulary = async (id, idFolder) => {
    try {
      await request.delete(`/vocabularies/${id}`).then((res) => {
        if (res.data.status === "ok") {
          Swal.fire({
            icon: "success",
            text: res.data.message,
            title: "Success!",
          }).then(() => {
            navigate(`"/admin/vocabulary/${idFolder}"`);
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const searchVocabularyFolder = async (keyword) => {
    try {
      const res = await request.get(`/vocabularyFolders/search?query=${keyword}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllVocabularyFolder,
    getAllVocabulary,
    getVocabularyFolderById,
    getVocabularyById,
    createVocabularyFolder,
    createVocabulary,
    getNextVocabularyFolders,
    updateVocabularyFolder,
    deleteVocabularyFolder,
    updateVocabulary,
    deleteVocabulary,
    searchVocabularyFolder,
  };
}

export default VocabularyFolderService;
