import React from 'react';
import {useNavigate} from "react-router-dom";
import {Form} from "react-final-form";
import {useDispatch, useSelector} from "react-redux";
import InputField from 'components/Field';
import {IUserInfo, setUserInfo} from "store/ducks/userInfo";
import Button from "../../components/Button";

const Login = () => {
    const navigate = useNavigate();
    const {users} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const handleSubmit = (values: any) => {
        const {email, password} = values;
        const userArr = users.filter((user: IUserInfo) => user.email === email && user.password === password);
        if (userArr.length > 0) {
            dispatch(setUserInfo(userArr[0]));
            navigate('/');
        } else {
            return {loginError: 'Your email or password is incorrect'}
        }
    };
    return (
        <Form
            onSubmit={handleSubmit}
            render={({handleSubmit, submitErrors, pristine}) => (
                <form onSubmit={handleSubmit} className='form col-12 col-sm-6 mx-auto'>
                    <h3 className='text-center'>Sign in to your account</h3>
                    {submitErrors && (
                        <div className="alert alert-danger" role="alert">
                            {submitErrors.loginError}
                        </div>
                    )}
                    <InputField type='email' name='email' label={'email'} required/>
                    <InputField type='password' name='password' label='password' required/>
                    <Button type='submit' className='btn btn-primary col-12' title='submit' disabled={pristine}/>
                </form>
            )}
        />
    );
};

export default Login;