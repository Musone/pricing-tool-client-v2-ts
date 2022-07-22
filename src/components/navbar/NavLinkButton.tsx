import React, {FunctionComponent, useEffect} from "react";
import {NavLink} from "react-router-dom";


const NavLinkButton: FunctionComponent<{ to: string, text: string, className?: string }>
    = ({to, text, className}) => {

    let defaultStyle: string = `hover:bg-neutral-400/60 text-neutral-800 ${window.location.pathname === to ? 'bg-neutral-400/60' : ''}`;

    return (
        <NavLink to={to}
                 className={`text-xs xl:font-medium  font-semibold xl:text-base rounded-full p-4 transition duration-1000 
                 ${className ? className : defaultStyle}`}>
            {text}
        </NavLink>
    )
}

export default NavLinkButton;