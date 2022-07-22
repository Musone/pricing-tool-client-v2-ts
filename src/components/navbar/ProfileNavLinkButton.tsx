import React, {FunctionComponent} from "react";
import {profilePageRoute} from "../../constants/generalRoutes";
import {NavLink} from "react-router-dom";


const ProfileNavLinkButton: FunctionComponent = () => {
    return (
        <NavLink to={profilePageRoute.path}>
            <div
                className={`${window.location.pathname === profilePageRoute.path ? 'bg-secondary_2/20' : ''} p-1 rounded-full w-16 object-contain hover:bg-secondary_2/20 transition-colors ease-in-out duration-1000`}>
                <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M25 13c0-6.617-5.383-12-12-12S1 6.383 1 13c0 3.384 1.413 6.439 3.674 8.622a.732.732 0 0 0 .189.172C7.003 23.777 9.858 25 13 25s5.996-1.223 8.137-3.206a.732.732 0 0 0 .19-.172A11.957 11.957 0 0 0 25 13zM13 2.5c5.79 0 10.5 4.71 10.5 10.5 0 2.455-.853 4.71-2.27 6.5-.65-2.097-2.508-3.74-5.028-4.495a5.455 5.455 0 0 0 2.272-4.424c0-3.015-2.455-5.467-5.474-5.467s-5.474 2.452-5.474 5.467c0 1.82.899 3.43 2.272 4.424-2.52.756-4.377 2.398-5.028 4.496A10.44 10.44 0 0 1 2.5 13C2.5 7.21 7.21 2.5 13 2.5zm-3.974 8.08a3.974 3.974 0 0 1 7.948 0 3.974 3.974 0 0 1-7.948 0zM6.031 20.833c.225-2.75 3.141-4.785 6.969-4.785s6.744 2.035 6.97 4.785C18.112 22.486 15.675 23.5 13 23.5s-5.113-1.014-6.97-2.668z"
                        fill="#458ccc" className="fill-1d1d1b">
                    </path>
                </svg>
            </div>
        </NavLink>
    )
}


export default ProfileNavLinkButton;