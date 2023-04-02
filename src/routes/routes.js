import config from "~/config";
import Admin from "~/pages/Admin/Admin";
import CourseManagement from "~/pages/Admin/pages/CourseManagement/CourseManagement";
import Dashboard from "~/pages/Admin/pages/Dashboard/Dashboard";
import UserManagement from "~/pages/Admin/pages/UserManagement/UserManagement";
import Home from "~/pages/Home/Home";
import Signin from "~/pages/Signin/Signin";

// Public routes
const publicRoutes = [
  { path: config.routes.signin, component: Signin },
  { path: config.routes.home, component: Home },
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
