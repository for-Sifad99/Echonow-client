import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from '../pages/home/Home/Home';
import PrivetRoute from '../routes/PrivetRoute'
import AllArticles from "../pages/AllArticles/AllArticles";
import AuthRoot from "../Layouts/AuthRoot";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import AddArticle from "../pages/AddArticle/AddArticle";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import Subscription from "../pages/Subscription/Subscription";
import Payment from "../pages/Subscription/Payment";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import MyArticles from "../pages/MyArticles/MyArticles";
import MyProfile from "../pages/MyProfile/MyProfile";
import DashboardRoot from "../Layouts/DashboardRoot";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";


const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            { index: true, Component: Home },
            { path: '/all-articles', Component: AllArticles },
            { path: '/add-article', element: <PrivetRoute><AddArticle /></PrivetRoute> },
            { path: '/article/:id', element: <PrivetRoute><ArticleDetails /></PrivetRoute> },
            { path: '/subscription', element: <PrivetRoute><Subscription /></PrivetRoute> },
            { path: '/payment/:duration/:cost', element: <PrivetRoute><Payment /></PrivetRoute> },
            { path: '/premium-articles', element: <PrivetRoute><PremiumArticles /></PrivetRoute> },
            { path: '/my-articles', element: <PrivetRoute><MyArticles /></PrivetRoute> },
            { path: '/my-profile', element: <PrivetRoute><MyProfile /></PrivetRoute> },
        ],
    },
    {
        path: "/Dashboard",
        Component: DashboardRoot,
        children: [
            { index: true, Component: Dashboard }
        ]
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
