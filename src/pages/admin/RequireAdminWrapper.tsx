import React, {FunctionComponent, ReactNode, useContext, useEffect, useState} from "react";
import {logout} from "../../utils/auth";
import UserContext from "../../contexts/UserContext";
import {adminLoginPageRoute, adminViewUsersRoute} from "../../constants/generalRoutes";
import PrimaryButton_2 from "../../components/buttons/PrimaryButton_2";
import {Link} from "react-router-dom";
import PrimaryButton_1 from "../../components/buttons/PrimaryButton_1";


function AdminNav() {

    return (
        <div className={'m-7 flex flex-col items-center w-screen'}>
            <div className={'mb-7 flex flex-wrap w-3/4 shadow max-w-fit gap-3 p-5'}>
                <PrimaryButton_2 text={'Sign Out'} callBack={() => logout(adminLoginPageRoute.path)}/>

                <Link to={adminViewUsersRoute.path}>
                    <PrimaryButton_1 text={'View Users'}/>
                </Link>

                <PrimaryButton_1 text={'Edit Specializations'}/>
                <PrimaryButton_1 text={'Edit Approaches'}/>
                <PrimaryButton_1 text={'Edit Credentials'}/>
                <PrimaryButton_1 text={'Edit Provinces and Cities'}/>
            </div>
            <hr className={'w-3/4'}/>
        </div>
    );
}

const RequireAdminWrapper: FunctionComponent<{
    children: ReactNode
}> = ({children}) => {
    const [userContext, setUserContext] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (!userContext || !userContext.roles.includes('admin')) {
            logout(adminLoginPageRoute.path);
        } else {
            setIsLoading(false)
        }
    })

    if (isLoading) {
        return (
            <span className={'text-semibold text-lg'}>Loading...</span>
        )
    }

    return (
        <>
            <AdminNav/>
            {children}
        </>
    )
}

export default RequireAdminWrapper;