import React, {FC, ReactElement, useEffect} from "react";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import '../../assets/css/index.css'
import {actionRoutes, routes, IRoute} from "../../config/routes";
import {NavLink} from "react-router-dom";
import LOGO from '../../assets/images/logo3.svg'

const Navigation = (): ReactElement => {
    useEffect(() => {
        console.log(window.location.pathname);
    }, [window.location.pathname]);


    return (
        <div className={''}>
            <div>
                <Link to={'/'}>
                    {/*<img src={LOGO} alt={'logo'}/>*/}
                    <svg width="51" height="53" viewBox="0 0 51 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.89854 0H0.66037V39.19H4.17105V26.4798H5.89854C7.51456 26.4798 8.85197 25.1418 8.85197 23.4694V3.01033C8.85197 1.33792 7.51456 0 5.89854 0ZM5.34128 22.8005H4.17105V3.67928H5.34128V22.8005Z" fill="#3030D0"/>
                            <path d="M15.1898 0.167236V18.0619H14.0753V0.167236H10.5646V39.0227H14.0753V21.574H15.1898V39.0227H18.7005V0.167236H15.1898Z" fill="#3030D0"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24.021 0.167236H26.2499C27.866 0.167236 29.2035 1.50515 29.2035 3.17756V39.0785H25.6928V21.4625H24.5224V39.0785H21.0117V3.17756C21.0117 1.50515 22.3492 0.167236 24.021 0.167236ZM24.5224 17.9504H25.6928V3.90227H24.5224V17.9504Z" fill="#3030D0"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M36.6996 0.167236H31.4615V39.0227H34.9723V21.6854H36.1425V39.0227H39.6532V21.0165C39.6532 20.6262 39.5974 20.236 39.4302 19.8458C39.5974 19.5114 39.6532 19.1211 39.6532 18.7309V3.17756C39.6532 1.50515 38.3157 0.167236 36.6996 0.167236ZM36.1425 18.0062H34.9723V3.84652H36.1425V18.0062Z" fill="#3030D0"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M44.9178 0H47.1468C48.7629 0 50.1003 1.33792 50.1003 3.01033V20.1803C50.1003 20.9608 49.4874 21.574 48.7071 21.574H46.4782C45.9209 21.574 45.4194 22.0757 45.4194 22.689V35.5107H46.5896V22.6332H50.1003V36.1797C50.1003 37.852 48.7629 39.19 47.1468 39.19H44.9178C43.2461 39.19 41.9087 37.852 41.9087 36.1797V3.01033C41.9087 1.33792 43.2461 0 44.9178 0ZM45.4194 18.0619H46.5896V3.67928H45.4194V18.0619Z" fill="#3030D0"/>
                            <path d="M0.5 42.7058V46.1423H31.3384L31.2398 52.6136L41.0384 46.1423H50.5V42.7058H40.0068L34.7736 46.1621L34.8263 42.7058H0.5Z" fill="#3030D0"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="50" height="52.6136" fill="white" transform="translate(0.5)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </Link>
            </div>
            {/*<nav style={{display: 'flex', justifyContent: 'space-between'}}>
            route.class
            */}
            <nav className={'flex justify-between'}>
                <ul>
                    {routes.map((route: IRoute, index: number) => {
                        return (
                            <li key={index}>
                                <NavLink to={route.path} className={'bg-red'}>
                                    {route.name}
                                </NavLink>
                            </li>
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

export default Navigation;