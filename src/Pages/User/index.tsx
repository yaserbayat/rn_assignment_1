import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IUserInfo, resetUserInfo} from "store/ducks/userInfo";

interface IUser {
}

const User: FC<IUser> = (props) => {
    const {userInfo}: { userInfo: IUserInfo } = useSelector((state: any) => state)
    const dispatch = useDispatch();
    const logOut = () => dispatch(resetUserInfo());
    return (
        <>
            <h1 className='text-center'>Your Info</h1>
            <div className="card col-12 col-sm-6 mx-auto">
                <img src="..." className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{userInfo.name} {userInfo.family}</h5>
                    <p className="card-text">
                        <span>Your role is: <b>{userInfo?.role}</b></span>
                        <br/>
                        <span>Email: <b>{userInfo?.email}</b></span>
                    </p>
                    <button className="btn btn-primary" onClick={logOut}>Log Out</button>
                </div>
            </div>
        </>
    );
};

export default User;