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
import Home from "~/pages/Home/Home";
import EnrollCourse from "~/pages/EnrollCourse/EnrollCourse";
import AllCourse from "~/pages/AllCourse/AllCourse";


// Public routes
const publicRoutes = [
    {path: config.routes.signin, component: Signin},
    {path: config.routes.signup, component: Signup},
    {path: config.routes.coursedetail, component: CourseDetail, layout: DefaultLayout},
    {path: config.routes.home, component: Home, layout: DefaultLayout},
    {path: config.routes.allcourse, component: AllCourse, layout: DefaultLayout}
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
