import React, {FunctionComponent, ReactElement, useRef, useState} from "react";
import {Link} from "react-router-dom";
import LOGO from '../../assets/images/logo3.svg'
import NavbarLinkButtonList from "./NavbarLinkButtonList";
import MobileNavDropleft from "./MobileNavDropleft";



const NavbarContainer: FunctionComponent = (): ReactElement => {
    return (
        <nav
            className=" bg-gradient-to-br from-neutral-400 to-neutral-300/80 relative z-40 w-screen h-28 lg:h-auto sticky top-0 flex items-center justify-between shadow bg-neutaral-400/95 px-10 py-5 shadow-xl">
            <Link to={'/'}><img src={LOGO} alt={'logo'}/> </Link>

            <NavbarLinkButtonList className={'hidden lg:flex flex-wrap items-center justify-end'}/>

            <MobileNavDropleft />

        </nav>
    )
}

export default NavbarContainer;