//페이지
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Notice from "./components/Notice";
import UserManage from "./components/UserManage";
import Froala from "./components/Froala";

const routes = () => {
    return (

        [
            {
                path: ['/',"/home"],
                component: Home
            },
            {
                path: '/login',
                component: Login
            },
            {
                path: '/register',
                component: Register
            },
            {
                path: '/profile',
                component: Profile
            },
            {
                path: '/notice',
                component: Notice
            },
            {
                path: '/userManage',
                component: UserManage
            },
            {
                path: '/froala',
                component: Froala
            },
        ]
    );
};

export default routes();