const routes = {
  signin: "/login",
  signup: "/register",
  home: "/",
  coursedetail: "/coursedetail/:id",
  allCourse: "/allcourse",
  examFolder: "/examfolder",
  exam: "/exam",
  examResult: "/exam/result",
  createCourse: "/createcourse",
  overview: "/overview",
  notFound: "*",
  lesson: "/lesson/:id",
  vocabulary: "/vocabulary",
  vocabularyFolder: "/vocabularyfolder",
  articlesFolder: "/articlesFolder",
  article: "/article/:id",
  grammarsFolder: "/grammarsFolder",
  grammar: "/grammar",
  publicProfile: "/profileUser",
  changePassword: "/profileUser/changePassword",
  podcast: "/podcast",
  // Admin routes
  admin: "/admin",
  courseManagement: "/admin/course",
  lessonManagement: "/admin/lesson",
  grammarManagement: "/admin/grammar",
  vocabularyFolderManagement: "/admin/vocabularyfolder",
  vocabularyManagement: "/admin/vocabulary",
  articlesManagement: "admin/articles",
  userManagement: "/admin/user",
  addCourse: "/admin/course/add",
  addLesson: "/admin/lesson/add",
  addGrammar: "/admin/grammar/add",
  addVocabularyFolder: "/admin/vocabularyfolder/add",
  addArticles: "/admin/articles/add",
  addVocabulary: "/admin/vocabulary/add",
};

export default routes;
