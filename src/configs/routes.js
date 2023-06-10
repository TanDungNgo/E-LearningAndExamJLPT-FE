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
  updateCourseFolder: "/profileUser/updateCourse",
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
  learningPath: "/learningPath",
  listLesson: "/profileUser/updateCourse/:idCourse/listLesson",

  // Admin routes
  admin: "/admin",
  courseManagement: "/admin/course",
  lessonManagement: "/admin/lesson",
  grammarManagement: "/admin/grammar",
  vocabularyFolderManagement: "/admin/vocabularyfolder",
  vocabularyManagement: "/admin/vocabularyfolder/:idFolder",
  articlesManagement: "/admin/articles",
  userManagement: "/admin/user",
  examManagement: "/admin/exam",
  questionManagement: "/admin/question",
  statistics: "/admin/statistics",

  addCourse: "/admin/course/add",
  addLesson: "/admin/lesson/add",
  addGrammar: "/admin/grammar/add",
  addVocabularyFolder: "/admin/vocabularyfolder/add",
  addArticles: "/admin/articles/add",
  addVocabulary: "/admin/vocabularyFolder/:idFolder/vocabulary/add",
  addExam: "/admin/exam/add",
  addQuestion: "/admin/question/add",

  editCourse: "/admin/course/edit/:id",
  editLesson: "/admin/lesson/edit/:id",
  editArticle: "/admin/articles/edit/:id",
  editGrammar: "/admin/grammar/edit/:id",
  editVocabularyFolder: "/admin/vocabularyFolder/edit/:id",
<<<<<<< HEAD
  editVocabulary: "/admin/vocabulary/edit/:id",
  editExam: "/admin/exam/edit/:id"
=======
  editVocabulary: "/admin/vocabularyFolder/:idFolder/vocabulary/edit/:id",
>>>>>>> develop

};

export default routes;
