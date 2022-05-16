import React, {ReactElement} from 'react'
import {Link} from 'react-router-dom'
import {Routes} from 'react-router-dom'
import {routes} from "./config/routes";
import IRoute from "./interfaces/IRoute"

export default function App(): ReactElement {
    //

    return <div className={'container'}>
        <nav>
            <div>
                <Link to={'/'}>Home</Link>
            </div>
            <div>
                <Link to={'/auth/login'}>Login</Link> | {' '}
                <Link to={'/auth/register'}>Create an account</Link>
            </div>
        </nav>
        <Routes>

        </Routes>
    </div>

}
