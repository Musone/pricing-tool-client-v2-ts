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
import AdminHomePage from "../pages/admin/AdminHomePage";
import loginPage from "../pages/auth/LoginPage";
import AdminViewUsersPage from "../pages/admin/views/users-view/AdminViewUsersPage";
import UserProfilePage from "../pages/admin/views/users-view/UserProfilePage";
import EditFiltersPage from "../pages/admin/views/edit/EditFiltersPage";

export interface IRoute {
    path: string,
    component: FunctionComponent<any>,
    class: string,
    name: string,
    protected: boolean
}

export const adminLoginPageRoute: IRoute = {
    path: '/admin/login',
    component: loginPage,
    class: '',
    name: 'admin login',
    protected: false
}

export const adminPageRoute: IRoute = {
    path: '/admin',
    component: AdminHomePage,
    class: '',
    name: 'admin home',
    protected: false
}

export const editSpecsRoute: IRoute = {
    path: '/admin/specializations',
    component: EditFiltersPage,
    class: '',
    name: 'admin edit specs',
    protected: false
}

export const editApproachesRoute: IRoute = {
    path: '/admin/approaches',
    component: EditFiltersPage,
    class: '',
    name: 'admin edit approach',
    protected: false
}

export const editLanguagesRoute: IRoute = {
    path: '/admin/languages',
    component: EditFiltersPage,
    class: '',
    name: 'admin edit languages',
    protected: false
}

export const editCredsRoute: IRoute = {
    path: '/admin/credentials',
    component: EditFiltersPage,
    class: '',
    name: 'admin edit credentials',
    protected: false
}

export const adminViewUsersRoute: IRoute = {
    path: '/admin/users',
    component: AdminViewUsersPage,
    class: '',
    name: 'admin view users',
    protected: false
}

export const adminViewUserProfileRoute: IRoute = {
    path: '/admin/users/:id',
    component: UserProfilePage,
    class: '',
    name: 'admin view users',
    protected: false
}

/*
export const adminSpecsRoute: IRoute = {
    path: '/admin/specializations',
    component: AdminHomePage,
    class: '',
    name: 'admin specs',
    protected: false
}

export const adminApproachesRoute: IRoute = {
    path: '/admin/approaches',
    component: AdminHomePage,
    class: '',
    name: 'admin specs',
    protected: false
}

export const adminCredsRoute: IRoute = {
    path: '/admin/credentials',
    component: AdminHomePage,
    class: '',
    name: 'admin creds',
    protected: false
}

export const adminGeolocation: IRoute = {
    path: '/admin/geolocation',
    component: AdminHomePage,
    class: '',
    name: 'admin provinces and cities',
    protected: false
}
*/





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
    component: FindACounselorPage,
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
    /*{
        path: '/clients',
        component: ClientsPage, // Todo
        class: '',
        name: 'CLIENTS',
        protected: false
    },*/
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
    /*{
        path: '/FAQ',
        component: FaqPage, // Todo
        class: '',
        name: 'FAQ',
        protected: false
    },*/
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