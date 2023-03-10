import config from "~/config";
import Signin from "~/pages/Signin/Signin";

// Public routes
const publicRoutes = [
    {path: config.routes.signin, component: Signin}
]

// Private routes
const privateRoutes = []

export {publicRoutes, privateRoutes};