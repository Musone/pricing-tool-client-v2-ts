import React, {FC} from "react";

export default interface IRoute {
    path: string,
    component: FC,
    name: string,
    protected: boolean
}