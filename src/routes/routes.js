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
    path: config.routes.userManagement,
    component: UserManagement,
    layout: Admin,
  },
  { path: config.routes.addCourse, component: AddCourseForm, layout: Admin },
];

export { publicRoutes, privateRoutes };
