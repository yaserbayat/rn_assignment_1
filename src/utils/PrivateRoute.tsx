import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStore } from "store";
import {isEmpty} from "./Helpers";

const PrivateRoute = () => {
    const { userInfo } = useSelector((state: RootStore) => state);

    return (
        isEmpty(userInfo) ? (<Navigate to='/login'/>) : (<Outlet/>)
    );
}

export default PrivateRoute;