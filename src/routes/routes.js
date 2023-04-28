import config from "~/config";
import Admin from "~/pages/Admin/Admin";
import CourseManagement from "~/pages/Admin/pages/CourseManagement/CourseManagement";
import Dashboard from "~/pages/Admin/pages/Dashboard/Dashboard";
import UserManagement from "~/pages/Admin/pages/UserManagement/UserManagement";
import Home from "~/pages/Home/Home";
import Signin from "~/pages/Signin/Signin";
import Signup from "~/pages/Signup/Signup";
import CourseDetail from "~/pages/CourseDetail/CourseDetail";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import Footer from "~/layouts/components/Footer/Footer"
import EnrollCourse from "~/pages/EnrollCourse/EnrollCourse";
import AllCourse from "~/pages/AllCourse/AllCourse";
import CreateCourse from "~/pages/CreateCourse/CreateCourse";
import ProfileUser from "~/pages/ProfileUser/ProfileUser";
import CardProfile from "~/components/CardProfile/CardProfile";


// Public routes
const publicRoutes = [
    {path: config.routes.signin, component: Signin},
    {path: config.routes.signup, component: Signup},
    {path: config.routes.coursedetail, component: CourseDetail, layout: DefaultLayout},
    {path: config.routes.home, component: Home, layout: DefaultLayout},
    {path: config.routes.allcourse, component: AllCourse, layout: DefaultLayout},
    {path: config.routes.createCourse, component: CreateCourse},
    {path: config.routes.profileUser, component: ProfileUser},
    {path: config.routes.cardProfile, component: CardProfile}
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
];

export { publicRoutes, privateRoutes };
