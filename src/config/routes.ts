import HomePage from "../pages/HomePage";
import {FunctionComponent} from "react";
import BookingHeroPage from "../pages/booking/BookingHeroPage";
import FindACounsellorPage from "../pages/booking/FindACounsellorPage";
import AboutUsPage from "../pages/misc/AboutUsPage";
import FaqPage from "../pages/misc/FaqPage";
import ContactPage from "../pages/misc/ContactPage";
import BlogPage from "../pages/misc/BlogPage";
import ClientsPage from "../pages/misc/ClientsPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

export interface IRoute {
    path: string,
    component: FunctionComponent,
    class: string,
    name: string,
    protected: boolean
}

export const findACounselorRoute: IRoute = {
    path: '/booking/find-a-counsellor',
    component: FindACounsellorPage,
    class: '',
    name: 'Find a counsellor',
    protected: false
}

export const routes: IRoute[] = [
    {
        path: '/',
        component: HomePage, // Todo
        class: '',
        name: 'HOME',
        protected: false
    },
    {
        path: '/clients',
        component: ClientsPage, // Todo
        class: '',
        name: 'CLIENTS',
        protected: false
    },
    {
        path: '/about-us',
        component: AboutUsPage, // Todo
        class: '',
        name: 'ABOUT US',
        protected: false
    },
    {
        path: '/blog',
        component: BlogPage, // Todo
        class: '',
        name: 'BLOG',
        protected: false
    },
    {
        path: '/contact',
        component: ContactPage, // Todo
        class: '',
        name: 'CONTACT',
        protected: false
    },
    {
        path: '/FAQ',
        component: FaqPage, // Todo
        class: '',
        name: 'FAQ',
        protected: false
    },
    {
        path: '/booking/hero',
        component: BookingHeroPage, // Todo
        class: 'Navbar-book-now-button',
        name: 'BOOK NOW',
        protected: false
    },
];


export const actionRoutes: IRoute[] = [
    {
        path: '/auth/login',
        component: LoginPage, // Todo
        class: 'auth-button',
        name: 'SIGN IN',
        protected: false
    },
    {
        path: '/auth/register',
        component: RegisterPage, // Todo
        class: 'auth-button',
        name: 'REGISTER',
        protected: false
    }]