import RequestHttp from "~/utils/request";
import Swal from "sweetalert2";
function vocabularyFolderService() {
  const { request } = RequestHttp();
  
  const getAllVocabularyFolder = async () => {
    try {
      const res = await request.get("/vocabularyFolders/all");
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

  const createVocabularyFolder = async (vocabularyFolders) => {
    try {
      await request.post("/vocabularyFolders", vocabularyFolders).then((res) => {
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

  const createVocabulary = async (vocabularies) => {
    try {
      await request.post("/vocabularies", vocabularies).then((res) => {
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
    getAllVocabularyFolder,
    getVocabularyFolderById,
    createVocabularyFolder,
    createVocabulary,
    getNextVocabularyFolders,
  };
}

export default vocabularyFolderService;
