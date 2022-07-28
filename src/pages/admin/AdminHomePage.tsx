import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import {logout} from "../../utils/auth";
import PrimaryButton_1 from "../../components/buttons/PrimaryButton_1";
import PrimaryButton_2 from "../../components/buttons/PrimaryButton_2";
import {adminLoginPageRoute, adminViewUsersRoute} from "../../constants/generalRoutes";
import PageWrapper from "../../components/PageWrapper";
import AdminViewUsersPage from "./views/users-view/AdminViewUsersPage";
import AdminEditSpecsView from "./views/AdminEditSpecsView";
import AdminEditApproachesView from "./views/AdminEditApproachesView";
import AdminEditCredsView from "./views/AdminEditCredsView";
import AdminEditGeoView from "./views/AdminEditGeoView";
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