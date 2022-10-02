import React, {Component, ReactElement} from 'react';
import { Navigate } from 'react-router-dom';
import config from "../../config/config";
import ExternalRedirect from "../../components/ExternalRedirect";

const BlogPage = (): ReactElement => {

    return <ExternalRedirect redirectLink={config.blogUrl} />
}

export default BlogPage;