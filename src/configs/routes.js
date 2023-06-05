const routes = {
  signin: "/login",
  signup: "/register",
  home: "/",
  coursedetail: "/coursedetail/:id",
  allCourse: "/allcourse",
  examFolder: "/examfolder",
  exam: "/exam/:level/:type",
  examResult: "/exam/result",
  createCourse: "/profileUser/createCourse",
  courseCreated: "/profileUser/courseCreated",
  completedCourse: "/profileUser/completedCourse",
  updateCourseFolder: "/profileUser/updateCourse/:id",
  overview: "/overview",
  notFound: "*",
  lesson: "/course/:courseId/lesson/:id",
  vocabulary: "/vocabulary/:id",
  vocabularyFolder: "/vocabularyfolder",
  articlesFolder: "/articlesFolder",
  article: "/article/:id",
  grammarsFolder: "/grammarsFolder",
  grammar: "/grammar/:id",
  publicProfile: "/profileUser",
  changePassword: "/profileUser/changePassword",
  podcast: "/podcast",
  createLesson: "/profileUser/createLesson",
  formUpdate: "/profileUser/updateCourse/formUpdate",
  examHistoryFolder: "/profileUser/examHistoryFolder",
  examHistory: "/profileUser/examHistoryFolder/examHistory/:id",

  // Admin routes
  admin: "/admin",
  courseManagement: "/admin/course",
  lessonManagement: "/admin/lesson",
  grammarManagement: "/admin/grammar",
  vocabularyFolderManagement: "/admin/vocabularyfolder",
  vocabularyManagement: "/admin/vocabulary",
  articlesManagement: "/admin/articles",
  userManagement: "/admin/user",
  examManagement: "/admin/exam",
  questionManagement: "/admin/question",


  addCourse: "/admin/course/add",
  addLesson: "/admin/lesson/add",
  addGrammar: "/admin/grammar/add",
  addVocabularyFolder: "/admin/vocabularyfolder/add",
  addArticles: "/admin/articles/add",
  addVocabulary: "/admin/vocabulary/add",
  addExam: "/admin/exam/add",
  addQuestion: "/admin/question/add",

  editCourse: "/admin/course/edit/:id",
  editArticle: "/admin/articles/edit/:id",
  editGrammar: "/admin/grammar/edit/:id"

};

export default routes;
