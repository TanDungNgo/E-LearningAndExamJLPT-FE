const routes = {
  signin: "/login",
  signup: "/register",
  home: "/",
  coursedetail: "/coursedetail/:id",
  allcourse: "/allcourse",
  exam: "/exam",
  examResult: "/exam/result",
  createCourse: "/createCourse",
  overview: "/overview",
  notFound: "*",
  lesson: "/lesson/:id",
  vocabulary: "/vocabulary",
  // Admin routes
  admin: "/admin",
  courseManagement: "/admin/course",
  lessonManagement: "/admin/lesson",
  grammarManagement: "/admin/grammar",
  vocabularyFolderManagement: "/admin/vocabularyFolder",
  articlesManagement: "admin/articles",
  userManagement: "/admin/user",
  addCourse: "/admin/course/add",
  addLesson: "/admin/lesson/add",
  addGrammar: "/admin/grammar/add",
  addVocabularyFolder: "/admin/vocabularyFolder/add",
  addArticles: "/admin/articles/add",
};

export default routes;
