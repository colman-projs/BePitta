import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { GlobalContext, User } from './context/GlobalContext';
import Loader from './components/Loader/Loader';

import GroupForm from './pages/GroupForm';
import GroupLobby from './pages/GroupLobby';
import PreferencesForm from './pages/PreferencesForm';
import NotFound from './pages/NotFound/NotFound';
import PreferencesPhotoForm from './pages/PreferencesPhotoForm';
import Header from './components/Header';
import ResultsPage from './pages/ResultsPage';
import Login from './pages/Login/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';

import './App.scss';
import { clientId } from './globals';
import { cookie } from './actions/cookieActions';
import { decodeJwt } from 'jose';
import { createUser } from './actions/userActions';

function App() {
    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {

        const userCradentials = cookie.getCookie(cookie.siteCookies.userCradentials);
        if (userCradentials !== "") {
            const responsePayload = decodeJwt(userCradentials);
            setUser(responsePayload);
        }

        const userId = cookie.getCookie(cookie.siteCookies.userId);
        if (userId === "") {
            createUser().then(userId => {
                cookie.setCookie(cookie.siteCookies.userId, userId);
            });
        }

    }, []);

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <User.Provider value={{ user, setUser }}>
                <GlobalContext.Provider value={{ isLoadingApp, setIsLoadingApp }}>
                    {isLoadingApp && <Loader />}
                    <Header />
                    <Routes>
                        <Route exact path="/" element={<GroupForm />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route
                            exact
                            path="/groups/:groupId/:restaurantId"
                            element={<GroupLobby />}
                        />
                        <Route
                            exact
                            path="/groups/:groupId/:restaurantId/preferences"
                            element={<PreferencesForm />}
                        />
                        <Route
                            exact
                            path="/groups/:groupId/:restaurantId/likes"
                            element={<PreferencesPhotoForm />}
                        />
                        <Route
                            exact
                            path="/groups/:groupId/:restaurantId/results"
                            element={<ResultsPage />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </GlobalContext.Provider>
            </User.Provider>
        </GoogleOAuthProvider>
    );
}

export default App;
