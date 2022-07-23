import HomePage from "../pages/HomePage";
import {FunctionComponent} from "react";
import BookingHeroPage from "../pages/booking/BookingHeroPage";
import FindACounselorPage from "../pages/booking/FindACounselorPage";
import AboutUsPage from "../pages/misc/AboutUsPage";
import FaqPage from "../pages/misc/FaqPage";
import ContactPage from "../pages/misc/ContactPage";
import BlogPage from "../pages/misc/BlogPage";
import ClientsPage from "../pages/misc/ClientsPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfilePage from "../pages/auth/ProfilePage";
import EmailVerificationPage from "../pages/auth/EmailVerificationPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import LogoutPage from "../pages/auth/LogoutPage";

export interface IRoute {
    path: string,
    component: FunctionComponent,
    class: string,
    name: string,
    protected: boolean
}

export const emailVerificationPageRoute: IRoute = {
    path: '/auth/verify',
    component: EmailVerificationPage,
    class: '',
    name: 'Verify email Page',
    protected: false
}

export const signOutPageRoute: IRoute = {
    path: '/auth/logout',
    component: LogoutPage,
    class: '',
    name: 'Logout Page',
    protected: false
}

export const profilePageRoute: IRoute = {
    path: '/profile',
    component: ProfilePage,
    class: '',
    name: 'Profile Page',
    protected: false
}

export const forgotPasswordPageRoute: IRoute = {
    path: '/auth/forgotPassword',
    component: ForgotPasswordPage,
    class: '',
    name: 'Forgot Password Page',
    protected: false
}

export const findACounselorRoute: IRoute = {
    path: '/booking/find-a-counselor',
    component: HomePage,
    class: '',
    name: 'Find a counselor',
    protected: false
}

export const generalRoutes: IRoute[] = [
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
];

export const bookingRoutes: IRoute[] = [
    {
        path: '/booking/hero',
        component: BookingHeroPage, // Todo
        class: 'Navbar-book-now-button',
        name: 'BOOK NOW',
        protected: false
    },
]

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