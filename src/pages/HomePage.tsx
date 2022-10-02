import React, {Component, ReactElement} from "react";
import ExternalRedirect from "../components/ExternalRedirect";
import config from "../config/config";


const HomePage = (): ReactElement => {
    return <ExternalRedirect redirectLink={config.homePageUrl} />
    /*return (
        <div>
            Home
        </div>)*/
}

export default HomePage;