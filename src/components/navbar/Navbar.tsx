import React, {FC, ReactElement, useEffect} from "react";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import '../../assets/css/index.css'
import {routes, IRoute, actionRoutes} from "../../config/routes";
import {NavLink} from "react-router-dom";
import LOGO from '../../assets/images/logo3.svg'

const Navbar = (): ReactElement => {
    useEffect(() => {
        console.log(window.location.pathname);
    }, [window.location.pathname]);


    return (
        <div className={'Navbar-container'}>
            <div className={'Navbar-logo-container'}>
                <Link to={'/'}><img src={LOGO} alt={'logo'}/> </Link>
            </div>
            <nav className={'Navbar-nav-tag'}>
                <ul>
                    {routes.map((route: IRoute, index: number) => {
                        return (
                            <li key={index}><NavLink to={route.path} className={route.class}>
                                {route.name}
                            </NavLink></li>
                        )
                    })}
                </ul>
                <ul>
                    {actionRoutes.map((route: IRoute, index: number) => {
                        return (
                            <li key={index}><NavLink to={route.path} className={route.class}>
                                {route.name}
                            </NavLink></li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;