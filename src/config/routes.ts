import IRoute from "../interfaces/IRoute";
import Home from "../pages/Home";

export const routes: IRoute[] = [
    {
        path: '/',
        component: Home, // Todo
        name: 'Home',
        protected: false
    }
];