import React, {ReactElement, useEffect, useState} from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import {
    actionRoutes,
    bookingRoutes,
    emailVerificationPageRoute,
    findACounselorRoute,
    forgotPasswordPageRoute,
    generalRoutes,
    IRoute,
    profilePageRoute,
    signOutPageRoute
} from "./constants/generalRoutes";
import NavbarContainer from "./components/navbar/NavbarContainer";
import './assets/css/index.css'
import FindACounselorPage from "./pages/booking/FindACounselorPage";
import {fetchUserInfo} from "./utils/auth";
import UserContext from "./contexts/UserContext";
import DisplayType from "./enums/DisplayType";
import IUserObj from "./components/lists/interfaces/IUserObj";

const App = (): ReactElement => {
    const [userContext, setUserContext] = useState<IUserObj | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const location = useLocation();

    /**
     * If the user context has not been set, the app will check if an accessToken/refreshToken is available in localStorage,
     * and then attempt to request for the userinformation.
     */
    useEffect(() => {
        if (userContext === null) {
            fetchUserInfo([userContext, setUserContext])
                .catch((e) => {
                    // console.error(e);
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [location])

    return (
        <UserContext.Provider value={[userContext, setUserContext]}>
            <NavbarContainer/>
            {!isLoading &&
                <Routes>
                    {generalRoutes.map((route: IRoute, index: number) => (
                        <Route key={index} path={route.path} element={<route.component/>}/>
                    ))}

                    {/*Todo: Compile all routes into a single list.*/}
                    {bookingRoutes.map((route: IRoute, index: number) => (
                        <Route key={index} path={route.path} element={<route.component/>}/>
                    ))}

                    {/*Todo: figure out how to handle pages that take props*/}
                    <Route path={findACounselorRoute.path}
                           element={<FindACounselorPage displayType={DisplayType.Counselor}/>}/>
                    <Route path={'/booking/find-a-supervisor'}
                           element={<FindACounselorPage displayType={DisplayType.Supervisor}/>}/>

                    {actionRoutes.map((route: IRoute, index: number) => (
                        <Route key={index} path={route.path} element={<route.component/>}/>
                    ))}

                    <Route path={profilePageRoute.path} element={<profilePageRoute.component/>}/>

                    <Route path={emailVerificationPageRoute.path} element={<emailVerificationPageRoute.component/>}/>
                    <Route path={forgotPasswordPageRoute.path} element={<forgotPasswordPageRoute.component/>}/>
                    <Route path={signOutPageRoute.path} element={<signOutPageRoute.component/>}/>
                </Routes>
            }
        </UserContext.Provider>
    )

}

export default App;