import React, {ReactElement} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import {actionRoutes, findACounselorRoute, IRoute, routes} from "./config/routes";
import Navbar from "./components/navbar/Navbar";

const App = (): ReactElement => {
    return (
        <div className={'container'}>

            <Navbar/>
            <Routes>
                {routes.map((route: IRoute, index: number) => <Route key={index} path={route.path}
                                                                     element={<route.component/>}/>)}

                {/*Todo: Compile all routes into a single list.*/}
                <Route path={findACounselorRoute.path} element={<findACounselorRoute.component/>}/>
                {actionRoutes.map((route: IRoute, index: number) => <Route key={index} path={route.path}
                                                                     element={<route.component/>}/>)}


            </Routes>
        </div>
    )

}

export default App;