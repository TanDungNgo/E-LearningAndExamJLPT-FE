import config from "~/config";
import Signin from "~/pages/Signin/Signin";
import Signup from "~/pages/Signup/Signup";
import Header from "~/components/Header/Header";

// Public routes
const publicRoutes = [
    {path: config.routes.signin, component: Signin},
    {path: config.routes.signup, component: Signup},
    {path: config.routes.header, component: Header},
]

// Private routes
const privateRoutes = []

export {publicRoutes, privateRoutes};