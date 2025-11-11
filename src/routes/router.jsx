import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from '../pages/home/Home/Home';
import PrivetRoute from '../routes/PrivetRoute';
import AdminRoute from './AdminRoute';
import AllArticles from "../pages/AllArticles/AllArticles";
import AuthRoot from "../Layouts/AuthRoot";
import Register from "../pages/Authentication/Register/Register";
import Login from "../pages/Authentication/Login/Login";
import AddArticle from "../pages/AddArticle/AddArticle";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import Subscription from "../pages/Subscription/Subscription";
import Payment from "../pages/Subscription/Payment";
import PremiumArticles from "../pages/PremiumArticles/PremiumArticles";
import MyArticles from "../pages/MyArticles/MyArticles";
import MyProfile from "../pages/MyProfile/MyProfile";
import Blogs from '../pages/Blogs/Blogs';
import BlogPost from '../pages/Blogs/BlogPost';
import DashboardRoot from "../Layouts/DashboardRoot";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import DashHome from "../pages/Dashboard/DashHome/DashHome";
import DashAllArticles from "../pages/Dashboard/DashAllArticles/DashAllArticles";
import AddPublisher from "../pages/Dashboard/AddPublisher/AddPublisher";
import Forbidden from "../pages/Forbidden/Forbidden";
import Error from "../pages/Error/Error";
import EmailVerification from "../pages/Authentication/EmailVerification/EmailVerification";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/all-articles',
                Component: AllArticles
            },
            {
                path: '/add-article',
                element:
                    <PrivetRoute>
                        <AddArticle />
                    </PrivetRoute>
            },
            {
                path: '/article/:id',
                Component: ArticleDetails
            },
            {
                path: '/subscription',
                element:
                    <PrivetRoute>
                        <Subscription />
                    </PrivetRoute>
            },
            {
                path: '/payment/:duration/:cost',
                element:
                    <PrivetRoute>
                        <Payment />
                    </PrivetRoute>
            }
            ,
            {
                path: '/premium-articles',
                element:
                    <PrivetRoute>
                        <PremiumArticles />
                    </PrivetRoute>
            },
            {
                path: '/my-articles',
                element:
                    <PrivetRoute>
                        <MyArticles />
                    </PrivetRoute>
            },
            {
                path: '/my-profile',
                element:
                    <PrivetRoute>
                        <MyProfile />
                    </PrivetRoute>
            },
            {
                path: '/our-blogs',
                element: <Blogs />
            },
            {
                path: '/our-blogs/:id',
                element: <BlogPost />
            },
            {
                path: '/verify-email',
                element: 
                    <PrivetRoute>
                        <EmailVerification />
                    </PrivetRoute>
            },
        ],
    },
    {
        path: "/dashboard",
        element:
            <AdminRoute>
                <PrivetRoute>
                    <DashboardRoot />
                </PrivetRoute>
            </AdminRoute>,
        children: [
            {
                index: true,
                element:
                    <AdminRoute>
                        <PrivetRoute>
                            <DashHome />
                        </PrivetRoute>
                    </AdminRoute>
            },
            {
                path: 'dashboard',
                element:
                    <AdminRoute>
                        <PrivetRoute>
                            <Dashboard />
                        </PrivetRoute>
                    </AdminRoute>
            },
            {
                path: 'all-users',
                element:
                    <AdminRoute>
                        <PrivetRoute>
                            <AllUsers />
                        </PrivetRoute>
                    </AdminRoute>
            },
            {
                path: 'all-articles',
                element:
                    <AdminRoute>
                        <PrivetRoute>
                            <DashAllArticles />
                        </PrivetRoute>
                    </AdminRoute>
            },
            {
                path: 'add-publisher',
                element:
                    <AdminRoute>
                        <PrivetRoute>
                            <AddPublisher />
                        </PrivetRoute>
                    </AdminRoute>
            },
        ]
    },
    {
        path: "/auth",
        Component: AuthRoot,
        children: [
            {
                path: 'register',
                Component: Register
            },
            {
                path: 'login',
                Component: Login
            },
        ],
    },
    {
        path: "/status/forbidden",
        Component: Forbidden,
    },
    {
        path: "/*",
        Component: Error,
    }
]);

export default router;