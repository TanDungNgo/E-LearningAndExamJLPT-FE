import config from "~/config";
import Home from "~/pages/Home/Home";
import Signin from "~/pages/Signin/Signin";

// Public routes
const publicRoutes = [
    {path: config.routes.signin, component: Signin},
    {path: config.routes.home, component: Home}
]

// Private routes
const privateRoutes = []

export {publicRoutes, privateRoutes};