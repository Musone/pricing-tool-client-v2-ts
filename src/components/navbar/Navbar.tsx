import React, {FC, FunctionComponent, ReactElement, useContext, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {
    generalRoutes,
    IRoute,
    actionRoutes,
    bookingRoutes,
    profilePageRoute,
    signOutPageRoute
} from "../../config/generalRoutes";
import {NavLink} from "react-router-dom";
import LOGO from '../../assets/images/logo3.svg'
import {lastFocusedElement, UserContext} from "../../App";

const NavbarLinks: FunctionComponent<{ classProp?: string }> = ({classProp}): ReactElement => {
    const [userContext, setUserContext] = useContext(UserContext);
    const defaultButtonStyle: string = "text-xs xl:font-medium  font-semibold xl:text-base rounded-full p-4 transition duration-1000 hover:bg-neutral-400/60 text-neutral-800";

    return (
        <ul tabIndex={0} className={`${classProp || ''} gap-x-5 gap-y-10 grow`}>
            {generalRoutes.map((route: IRoute, index: number) => {
                return (
                    <li key={index} className={'whitespace-nowrap'}>
                        <NavLink to={route.path} key={index}
                                 className={`${defaultButtonStyle} ${window.location.pathname === route.path ? 'bg-neutral-400/50' : ''}`}>
                            {route.name}
                        </NavLink>
                    </li>
                )
            })}


            {bookingRoutes.map((route: IRoute, index: number) => {
                return (
                    <li key={index} className={'whitespace-nowrap'}>
                        <NavLink to={route.path} key={index}
                                 className={`border-2 border-secondary_4 text-[#009159] ${window.location.pathname === route.path ? 'bg-secondary_4/10' : ''} hover:bg-secondary_4/10 ${defaultButtonStyle}`}>
                            {route.name}
                        </NavLink>
                    </li>
                )
            })}


            {userContext === null && actionRoutes.map((route: IRoute, index: number) => {
                return (
                    <li key={index} className={'whitespace-nowrap'}>
                        <NavLink key={index} to={route.path}
                                 className={`${defaultButtonStyle} text-secondary_2 ${window.location.pathname === route.path ? 'bg-secondary_2/20' : ''} hover:bg-secondary_2/20`}
                        >
                            {route.name}
                        </NavLink>
                    </li>
                )
            })}

            {userContext !== null &&
                <>
                    <li>
                        <NavLink to={signOutPageRoute.path}
                                 className={`${defaultButtonStyle} border-2 border-secondary_2 text-secondary_2 ${window.location.pathname === signOutPageRoute.path ? 'bg-secondary_2/20' : ''} hover:bg-secondary_2/20`}>
                            Sign Out
                        </NavLink>
                    </li>

                <li className={'whitespace-nowrap'}>
                    <NavLink to={profilePageRoute.path}
                             /*className={`${defaultButtonStyle} text-secondary_2 hover:bg-secondary_2/[.3]`}*/>
                        <div className={`${window.location.pathname === profilePageRoute.path ? 'bg-secondary_2/20' : ''} p-1 rounded-full w-16 object-contain hover:bg-secondary_2/20 transition-colors ease-in-out duration-1000`}>
                            <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 13c0-6.617-5.383-12-12-12S1 6.383 1 13c0 3.384 1.413 6.439 3.674 8.622a.732.732 0 0 0 .189.172C7.003 23.777 9.858 25 13 25s5.996-1.223 8.137-3.206a.732.732 0 0 0 .19-.172A11.957 11.957 0 0 0 25 13zM13 2.5c5.79 0 10.5 4.71 10.5 10.5 0 2.455-.853 4.71-2.27 6.5-.65-2.097-2.508-3.74-5.028-4.495a5.455 5.455 0 0 0 2.272-4.424c0-3.015-2.455-5.467-5.474-5.467s-5.474 2.452-5.474 5.467c0 1.82.899 3.43 2.272 4.424-2.52.756-4.377 2.398-5.028 4.496A10.44 10.44 0 0 1 2.5 13C2.5 7.21 7.21 2.5 13 2.5zm-3.974 8.08a3.974 3.974 0 0 1 7.948 0 3.974 3.974 0 0 1-7.948 0zM6.031 20.833c.225-2.75 3.141-4.785 6.969-4.785s6.744 2.035 6.97 4.785C18.112 22.486 15.675 23.5 13 23.5s-5.113-1.014-6.97-2.668z" fill="#458ccc" className="fill-1d1d1b">
                                </path>
                            </svg>
                        </div>
                    </NavLink>
                </li>



                </>
            }
        </ul>
    )
}


const Navbar = (): ReactElement => {
    const [userContext, setUserContext] = useContext(UserContext);
    const dropLeftRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     console.log(window.location.pathname);
    // }, [window.location.pathname]);


    return (
        // flex-flow-col
        // <nav className="flex h-auto items-center justify-between w-screen shadow bg-amber-50 pl-5 pr-10">
        <nav
            className=" bg-gradient-to-br from-neutral-400 to-neutral-300/80 relative z-40 w-screen h-28 lg:h-auto sticky top-0 flex items-center justify-between shadow bg-neutaral-400/95 px-10 py-5 shadow-xl">
            <Link to={'/'}><img src={LOGO} alt={'logo'}/> </Link>


            <NavbarLinks classProp={'hidden lg:flex flex-wrap items-center justify-end'}/>

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
                <div className={'bg-gradient-to-b from-neutral-300/80 to-neutral-200 px-5 lg:h-0 flex flex-col items-center shadow-2xl'}>
                    <NavbarLinks classProp={'flex w-fit flex-col items-end py-10 pr-5 '}/>
                </div>
            </div>

        </nav>
    )
}

export default Navbar;