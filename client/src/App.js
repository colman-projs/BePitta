import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { decodeJwt } from 'jose';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { GlobalContext } from './context/GlobalContext';
import Loader from './components/Loader/Loader';
import GroupForm from './pages/GroupForm';
import GroupLobby from './pages/GroupLobby';
import PreferencesForm from './pages/PreferencesForm';
import NotFound from './pages/NotFound/NotFound';
import PreferencesPhotoForm from './pages/PreferencesPhotoForm';
import Header from './components/Header';
import ResultsPage from './pages/ResultsPage';
import { clientId } from './globals';
import { cookie } from './actions/cookieActions';
import { createUser } from './actions/userActions';
import { UserContext } from './context/UserContext';
import { UserIdContext } from './context/UserIdContext';
import UserPreferences from './pages/UserPreferences';
import WaitingParticipants from './pages/WaitingParticipants/WaitingParticipants';
import ManageRestaurants from './pages/ManageRestaurants';
import ManageDishes from './pages/ManageDishes';
import ManageTags from './pages/ManageTags';

import './App.scss';

function App() {
    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const _userId = cookie.getCookie(cookie.siteCookies.userId);
        if (!_userId) {
            createUser().then(uId => {
                cookie.setCookie(cookie.siteCookies.userId, uId);
                setUserId(uId);
            });
        } else {
            setUserId(_userId);
        }

        const userCradentials = cookie.getCookie(
            cookie.siteCookies.userCradentials,
        );

        if (!userCradentials) return;

        const responsePayload = decodeJwt(userCradentials);
        setUser(responsePayload);
    }, []);

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <UserIdContext.Provider value={{ userId, setUserId }}>
                <UserContext.Provider value={{ user, setUser }}>
                    <GlobalContext.Provider
                        value={{ isLoadingApp, setIsLoadingApp }}
                    >
                        {isLoadingApp && <Loader />}
                        <Header />
                        <Routes>
                            <Route exact path="/" element={<GroupForm />} />
                            <Route
                                exact
                                path="/user/preferences"
                                element={<UserPreferences />}
                            />
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
                                path="/groups/:groupId/:restaurantId/waiting"
                                element={<WaitingParticipants />}
                            />
                            <Route
                                exact
                                path="/groups/:groupId/:restaurantId/results"
                                element={<ResultsPage />}
                            />
                            <Route
                                exact
                                path="/admin/restaurants"
                                element={<ManageRestaurants />}
                            />
                            <Route
                                exact
                                path="/admin/dishes"
                                element={<ManageDishes />}
                            />
                            <Route
                                exact
                                path="/admin/tags"
                                element={<ManageTags />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </GlobalContext.Provider>
                </UserContext.Provider>
            </UserIdContext.Provider>
        </GoogleOAuthProvider>
    );
}

export default App;
