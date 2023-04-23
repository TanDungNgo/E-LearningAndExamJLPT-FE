import config from "~/config";
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
]

// Private routes
const privateRoutes = []

export {publicRoutes, privateRoutes};