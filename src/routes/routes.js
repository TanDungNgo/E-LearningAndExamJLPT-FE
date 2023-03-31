import config from "~/config";
import Signin from "~/pages/Signin/Signin";
import Signup from "~/pages/Signup/Signup";

// Public routes
const publicRoutes = [
    {path: config.routes.signin, component: Signin},
    {path: config.routes.signup, component: Signup}
]

// Private routes
const privateRoutes = []

export {publicRoutes, privateRoutes};