import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import {adminLoginPageRoute, adminViewUsersRoute} from "../../constants/generalRoutes";
import {Navigate} from "react-router-dom";


const AdminHomePage: FunctionComponent<{}> = () => {


    return (



        <Navigate
            to={adminViewUsersRoute.path}
        />

        // <>redirect...</>
    )
}


export default AdminHomePage;