import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from '../pages/home/Home/Home';
import AllArticles from "../pages/AllArticles/AllArticles";


const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            { index: true, Component: Home},
            { path: 'all-articles', Component: AllArticles},
        ],
    },
]);

export default router;
