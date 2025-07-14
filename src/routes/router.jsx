import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from '../pages/home/Home/Home';
import AllArticles from "../pages/AllArticles/AllArticles";
import AuthRoot from "../Layouts/AuthRoot";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";


const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            { index: true, Component: Home},
            { path: 'all-articles', Component: AllArticles},
        ],
    },
    {
        path: "/auth",
        Component: AuthRoot,
        children: [
            { path: 'register', Component: Register},
            { path: 'login', Component: Login},
        ],
    },
]);

export default router;
