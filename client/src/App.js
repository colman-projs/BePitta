import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { GlobalContext } from './context/GlobalContext';
import Loader from './components/Loader/Loader';

import GroupForm from './pages/GroupForm';
import GroupLobby from './pages/GroupLobby';
import PreferencesForm from './pages/PreferencesForm';
import NotFound from './pages/NotFound/NotFound';
import PreferencesPhotoForm from './pages/PreferencesPhotoForm';
import Header from './components/Header';
import ResultsPage from './pages/ResultsPage';

import './App.scss';

function App() {
    const [isLoadingApp, setIsLoadingApp] = useState(false);

    return (
        <GlobalContext.Provider value={{ isLoadingApp, setIsLoadingApp }}>
            {isLoadingApp && <Loader />}
            <Header />
            <Routes>
                <Route exact path="/" element={<GroupForm />} />
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
    );
}

export default App;
