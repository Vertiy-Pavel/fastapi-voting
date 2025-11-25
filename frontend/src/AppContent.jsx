import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import ProfilePage from './pages/ProfilePage';
import ConstructorPage from './pages/ConstructorPage';
import Details from './pages/DetailsPage';
import VotesPage from './pages/VotesPage';
import Header from './components/Header';
import HeaderLogin from './components/HeaderLogin';
import DepartmentsPage from "./pages/DepartmentsPage.jsx";

function AppContent() {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/confirm/:uuid'  && <Header/>}
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/votes' element={<VotesPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>

                {/* подтверждения смены пароля */}
                <Route path='/profile/password/:uuid' element={<ProfilePage variant='password'/>}/>
                {/* подтверждения смены почты */}
                <Route path='/profile/email/:uuid' element={<ProfilePage variant='email'/>}/>

                <Route path='/constructor' element={<ConstructorPage/>}/>
                <Route path='/details' element={<Details/>}/>
                <Route path='/votes/:votingId' element={<Details/>}/>
                <Route path='/departments' element={<DepartmentsPage/>}/>

                {/* подтверждения почты при регистрации */}
                <Route path='/confirm/:uuid' element={<LoginPage/>}/>
            </Routes>
        </>
    );
}

export default AppContent;