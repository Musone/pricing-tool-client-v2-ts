import React, {FunctionComponent, ReactElement, useRef} from "react";
import {Link} from "react-router-dom";
import LOGO from '../../assets/images/logo3.svg'
import {lastFocusedElement} from "../../App";
import NavbarLinkButtonList from "./NavbarLinkButtonList";



const NavbarContainer: FunctionComponent = (): ReactElement => {
    const dropLeftRef = useRef<HTMLDivElement>(null);

    return (
        <nav
            className=" bg-gradient-to-br from-neutral-400 to-neutral-300/80 relative z-40 w-screen h-28 lg:h-auto sticky top-0 flex items-center justify-between shadow bg-neutaral-400/95 px-10 py-5 shadow-xl">
            <Link to={'/'}><img src={LOGO} alt={'logo'}/> </Link>

            <NavbarLinkButtonList classProp={'hidden lg:flex flex-wrap items-center justify-end'}/>

            <button
                className={'lg:hidden w-16 rounded-3xl border-2 border-secondary_2 hover:brightness-125 shadow-2xl p-3'}
                onClick={() => {
                    if (dropLeftRef !== null && lastFocusedElement !== dropLeftRef.current) {
                        console.log('hello')
                        dropLeftRef.current?.focus();
                    }
                }}>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21 1H3a3 3 0 0 0 0 6h18a3 3 0 0 0 0-6Zm0 4H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2ZM21 17H3a3 3 0 0 0 0 6h18a3 3 0 0 0 0-6Zm0 4H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2ZM21 9H3a3 3 0 0 0 0 6h18a3 3 0 0 0 0-6Zm0 4H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2Z"
                        fill="#458ccc" className="fill-232323"></path>
                </svg>
            </button>

            <div
                tabIndex={-1}
                ref={dropLeftRef}
                className={'focus:outline-none absolute top-28 right-0 max-w-0 focus-within:max-w-screen-2xl h-max lg:max-w-0 transition-[max-width] ease-in-out duration-500 overflow-hidden rounded-bl-3xl shadow-xl'}>
                <div
                    className={'bg-gradient-to-b from-neutral-300/80 to-neutral-200 px-5 lg:h-0 flex flex-col items-center shadow-2xl'}>
                    <NavbarLinkButtonList classProp={'flex w-fit flex-col items-end py-10 pr-5 '}/>
                </div>
            </div>

        </nav>
    )
}

export default NavbarContainer;