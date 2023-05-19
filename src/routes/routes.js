import config from "~/configs";
import Admin from "~/pages/Admin/Admin";
import CourseManagement from "~/pages/Admin/pages/CourseManagement/CourseManagement";
import Dashboard from "~/pages/Admin/pages/Dashboard/Dashboard";
import UserManagement from "~/pages/Admin/pages/UserManagement/UserManagement";
import Home from "~/pages/Home/Home";
import Signin from "~/pages/Signin/Signin";
import Signup from "~/pages/Signup/Signup";
import CourseDetail from "~/pages/CourseDetail/CourseDetail";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import AllCourse from "~/pages/AllCourse/AllCourse";
import CreateCourse from "~/pages/CreateCourse/CreateCourse";
import Overview from "~/pages/Overview/Overview";
import ExamPage from "~/pages/Exam/ExamPage";
import ExamResult from "~/pages/ExamResult/ExamResult";
import NotFound from "~/pages/NotFound/NotFound";
import AddCourseForm from "~/pages/Admin/pages/CourseManagement/AddCourseForm";

import ProfileUser from "~/pages/ProfileUser/ProfileUser";
import PublicProfile from "~/pages/ProfileUser/pages/PublicProfile/PublicProfile";
import ChangePassword from "~/pages/ProfileUser/pages/ChangePassword/ChangePassword";

import AddLessonForm from "~/pages/Admin/pages/LessonsManagement/AddLessonForm";
import AddVocabularyForm from "~/pages/Admin/pages/VocabularyManagement/AddVocabularyForm";
import VocabularyManagement from "~/pages/Admin/pages/VocabularyManagement/VocabularyManagement";
import LessonManagement from "~/pages/Admin/pages/LessonsManagement/LessonManagement";
import AddGrammarForm from "~/pages/Admin/pages/GrammarManagement/AddGrammarForm";
import GrammarManagement from "~/pages/Admin/pages/GrammarManagement/GrammarManagement";
import AddVocabularyFolderForm from "~/pages/Admin/pages/VocabularyFolderManagement/AddVocabularyFolderForm";
import VocabularyFolderManagement from "~/pages/Admin/pages/VocabularyFolderManagement/VocabularyFolderManagement";
import AddArticlesForm from "~/pages/Admin/pages/ArticlesManagement/AddArticlesForm";
import ArticlesManagement from "~/pages/Admin/pages/ArticlesManagement/ArticlesManagement";
import Lesson from "~/pages/Lesson/Lesson";
import Vocabulary from "~/pages/Vocabulary/Vocabulary";
import VocabularyFolder from "~/pages/VocavularyFolder/VocavularyFolder";
import ArticleFolder from  "~/pages/ArticleFolder/ArticleFolder";
import Article from "~/pages/Article/Article";
import GrammarCard from "~/components/GrammarCard/GrammarCard";
import ListGrammar from "~/components/ListGrammar/ListGrammar";
import GrammarsFolder from "~/pages/GrammarsFolder/GrammarsFolder";
import Grammar from "~/pages/Grammar/Grammar";

// Public routes
const publicRoutes = [
  { path: config.routes.signin, component: Signin },
  { path: config.routes.signup, component: Signup },
  {
    path: config.routes.coursedetail,
    component: CourseDetail,
    layout: DefaultLayout,
  },
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  {
    path: config.routes.allcourse,
    component: AllCourse,
    layout: DefaultLayout,
  },
  { path: config.routes.overview, component: Overview, layout: DefaultLayout },
  { path: config.routes.exam, component: ExamPage },
  { path: config.routes.examResult, component: ExamResult },
  { path: config.routes.createCourse, component: CreateCourse },
  { path: config.routes.notFound, component: NotFound },
  { path: config.routes.lesson, component: Lesson, layout: DefaultLayout },
  {
    path: config.routes.vocabulary,
    component: Vocabulary,
    layout: DefaultLayout,
  },
  { path: config.routes.vocabularyFolder, component: VocabularyFolder, layout: DefaultLayout},
  { path: config.routes.articlesFolder, component: ArticleFolder, layout: DefaultLayout},
  { path: config.routes.article, component: Article, layout: DefaultLayout},
  { path: config.routes.grammarsFolder, component: GrammarsFolder, layout: DefaultLayout},
  { path: config.routes.grammar, component: Grammar, layout: DefaultLayout},
];

// Private routes
const privateRoutes = [
  { path: config.routes.admin, component: Dashboard, layout: Admin },
  {
    path: config.routes.courseManagement,
    component: CourseManagement,
    layout: Admin,
  },
  {
    path: config.routes.lessonManagement,
    component: LessonManagement,
    layout: Admin,
  },
  {
    path: config.routes.userManagement,
    component: UserManagement,
    layout: Admin,
  },
  {
    path: config.routes.grammarManagement,
    component: GrammarManagement,
    layout: Admin,
  },
  {
    path: config.routes.vocabularyFolderManagement,
    component: VocabularyFolderManagement,
    layout: Admin,
  },
  {
    path: config.routes.articlesManagement,
    component: ArticlesManagement,
    layout: Admin,
  },
  {
    path: config.routes.vocabularyManagement,
    component: VocabularyManagement,
    layout: Admin
  },
  { path: config.routes.addCourse, component: AddCourseForm, layout: Admin },
  {path: config.routes.profileUser, component: ProfileUser, layout: ProfileUser},
  {
    path: config.routes.publicProfile,
    component: PublicProfile,
    layout: ProfileUser,
  },
  {
    path: config.routes.changePassword,
    component: ChangePassword,
    layout: ProfileUser,
  },
  { path: config.routes.addLesson, component: AddLessonForm, layout: Admin },
  { path: config.routes.addGrammar, component: AddGrammarForm, layout: Admin },
  {
    path: config.routes.addVocabularyFolder,
    component: AddVocabularyFolderForm,
    layout: Admin,
  },
  {
    path: config.routes.addArticles,
    component: AddArticlesForm,
    layout: Admin,
  },
  {
    path: config.routes.addVocabulary,
    component: AddVocabularyForm,
    layout: Admin,
  },
];

export { publicRoutes, privateRoutes };
