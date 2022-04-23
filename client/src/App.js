import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import GroupForm from './components/GroupForm';
import GroupLobby from './components/GroupLobby';
import PreferencesForm from './components/PreferencesForm';
import NotFound from './components/NotFound/NotFound';
import { GlobalContext } from './context/GlobalContext';
import Loader from './components/Loader/Loader';

import './App.scss';
import PreferencesPhotoForm from './components/PreferencesPhotoForm';

function App() {
    const [isLoadingApp, setIsLoadingApp] = useState(false);

    return (
        <GlobalContext.Provider value={{ isLoadingApp, setIsLoadingApp }}>
            {isLoadingApp && <Loader />}
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
                <Route path="*" element={<NotFound />} />
            </Routes>
        </GlobalContext.Provider>
    );
}

export default App;
