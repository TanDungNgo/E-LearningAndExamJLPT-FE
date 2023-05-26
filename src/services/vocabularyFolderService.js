import RequestHttp from "~/utils/request";

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

  return {
    getAllVocabularyFolder,
    getVocabularyFolderById,
  };
}

export default vocabularyFolderService;
