import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from '../pages/home/Home/Home';
import AllArticles from "../pages/AllArticles/AllArticles";
import AuthRoot from "../Layouts/AuthRoot";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import AddArticle from "../pages/AddArticle/AddArticle";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import Subscription from "../pages/Subscription/Subscription";
import Payment from "../pages/Subscription/Payment";


const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            { index: true, Component: Home },
            { path: '/all-articles', Component: AllArticles },
            { path: '/add-article', Component: AddArticle },
            { path: '/article/:id', Component: ArticleDetails },
            { path: '/subscription', Component: Subscription },
            { path: '/payment/:duration/:cost', Component: Payment }
        ],
    },
    {
        path: "/auth",
        Component: AuthRoot,
        children: [
            { path: 'register', Component: Register },
            { path: 'login', Component: Login },
        ],
    },
]);

export default router;
