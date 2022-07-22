import React, {FunctionComponent, ReactElement, useContext} from "react";
import UserContext from "../../contexts/UserContext";
import {actionRoutes, bookingRoutes, generalRoutes, IRoute, signOutPageRoute} from "../../constants/generalRoutes";
import NavLinkButton from "./NavLinkButton";
import {NavLink} from "react-router-dom";
import ProfileNavLinkButton from "./ProfileNavLinkButton";

const NavbarLinkButtonList: FunctionComponent<{ classProp?: string }> = ({classProp}): ReactElement => {
    const [userContext, setUserContext] = useContext(UserContext);
    const defaultButtonStyle: string = "text-xs xl:font-medium  font-semibold xl:text-base rounded-full p-4 transition duration-1000 hover:bg-neutral-400/60 text-neutral-800";

    return (
        <ul tabIndex={0} className={`${classProp || ''} gap-x-5 gap-y-10 grow`}>
            {generalRoutes.map((route: IRoute, i: number) => {
                return (
                    <li key={i}>
                        <NavLinkButton key={i} to={route.path} text={route.name}/>
                    </li>
                )
            })}


            {bookingRoutes.map((route: IRoute, index: number) => {
                return (
                    <li key={index}>
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
                        <NavLinkButton to={route.path} text={route.name} className={`text-secondary_2 hover:bg-secondary_2/20 ${window.location.pathname === route.path ? 'bg-secondary_2/20' : ''}`}/>
                    </li>
                )
            })}

            {userContext !== null &&
                <>
                    <li>
                        <NavLinkButton to={signOutPageRoute.path} text={'Sign Out'} className={`border-2 border-secondary_2 text-secondary_2 hover:bg-secondary_2/20 ${window.location.pathname === signOutPageRoute.path ? 'bg-secondary_2/20' : ''}`} />
                    </li>

                    <li className={'whitespace-nowrap'}>
                        <ProfileNavLinkButton />
                    </li>
                </>
            }
        </ul>
    )
}

export default NavbarLinkButtonList;