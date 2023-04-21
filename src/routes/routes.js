import config from "~/config";
import Signin from "~/pages/Signin/Signin";
import Signup from "~/pages/Signup/Signup";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
import Footer from "~/layouts/components/Footer/Footer"
import Home from "~/pages/Home/Home";
import EnrollCourse from "~/pages/EnrollCourse/EnrollCourse";


// Public routes
const publicRoutes = [
    {path: config.routes.signin, component: Signin},
    {path: config.routes.signup, component: Signup},
    {path: config.routes.home, component: Home, layout: DefaultLayout},
    {path: config.routes.enrollCourse, component: EnrollCourse, layout: DefaultLayout},
]

// Private routes
const privateRoutes = []

export {publicRoutes, privateRoutes};