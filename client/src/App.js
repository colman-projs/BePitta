import { Routes, Route } from 'react-router-dom';
import GroupForm from './components/GroupForm';
import GroupLobby from './components/GroupLobby';
import PreferencesForm from './components/PreferencesForm';
import NotFound from './components/NotFound/NotFound';

import './App.scss';

function App() {
    return (
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
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
