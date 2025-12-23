import React from 'react';
import {Routes, Route, useLocation, matchPath} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ConstructorPage from './pages/ConstructorPage';
import Details from './pages/DetailsPage';
import VotesPage from './pages/VotesPage';
import Header from './components/Header';
import DepartmentsPage from "./pages/DepartmentsPage.jsx";

function AppContent() {
    const location = useLocation();
    const isConfirm = !!matchPath('/confirm/:uuid', location.pathname);

    const hideHeader = ['/login', '/register'].includes(location.pathname) || isConfirm;

    return (
        <>
            {!hideHeader && <Header/>}
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/' element={<VotesPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>

                {/* подтверждения смены пароля */}
                <Route path='/profile/password/:uuid' element={<ProfilePage variant='password'/>}/>
                {/* подтверждения смены почты */}
                <Route path='/profile/email/:uuid' element={<ProfilePage variant='email'/>}/>

                <Route path='/vote/create' element={<ConstructorPage active='create-poll' />}/>
                <Route path='/vote/templates' element={<ConstructorPage active='poll-templates' />}/>

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