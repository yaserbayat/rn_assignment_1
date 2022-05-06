import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Header from 'components/Header';
import Assessments from 'pages/Assessments';
import User from 'pages/User';
import AssessmentsKits from 'pages/AssessmentsKits';
import QuestionTypes from 'pages/QuestionTypes';
import Login from 'pages/Login';
import Kit from "pages/Kit";
import { IUserInfo, resetUserInfo, USER_ROLE } from "store/ducks/userInfo";
import PrivateRoute from 'utils/PrivateRoute';
import { isEmpty } from "utils/Helpers";
import './style.css';


const App = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { userInfo }: { userInfo: IUserInfo } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const handleLogOut = () => dispatch(resetUserInfo());
  const isLogin = !isEmpty(userInfo);
  const isAdmin = userInfo?.role === USER_ROLE.ADMIN;
  useEffect(() => {
    if (!isLogin) navigate('/login');
    if (window.scrollTo) window.scrollTo(0, 0);
  }, [pathname])

  return (
    <div className="App">
      <Header onLogOut={handleLogOut} isLogin={isLogin} isAdmin={isAdmin}/>
      <main className='container py-4'>
        <Routes>
          <Route path='/' element={<PrivateRoute/>}>
            <Route path='/' element={<User/>}/>
            <Route path='/assessments' element={<Assessments/>}/>
            <Route path='/assessmentsKits' element={<AssessmentsKits isAdmin={isAdmin}/>}/>
            <Route path='/assessmentsKits/:title' element={<Kit/>}/>
            <Route path='/questionTypes' element={<QuestionTypes/>}/>
          </Route>
          {<Route path='/login' element={isLogin ? 'You already logged in' : <Login/>}/>}
        </Routes>
      </main>
    </div>
  );
};

export default App;