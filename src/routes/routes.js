import config from "~/config";
import Home from "~/pages/Home/Home";
import Signin from "~/pages/Signin/Signin";
import Signup from "~/pages/Signup/Signup";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";

// Public routes
const publicRoutes = [
    {path: config.routes.signin, component: Signin},
    {path: config.routes.signup, component: Signup},
    {path: config.routes.home, component: Home, layout: DefaultLayout},
]

// Private routes
const privateRoutes = []

export {publicRoutes, privateRoutes};