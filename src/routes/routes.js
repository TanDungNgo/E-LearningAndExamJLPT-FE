import config from "~/config";
import Home from "~/pages/Home/Home";
import Signin from "~/pages/Signin/Signin";
import Signup from "~/pages/Signup/Signup";
import Header from "~/components/Header/Header";

// Public routes
const publicRoutes = [
    {path: config.routes.signin, component: Signin},
    {path: config.routes.home, component: Home}
]

// Private routes
const privateRoutes = []

export {publicRoutes, privateRoutes};