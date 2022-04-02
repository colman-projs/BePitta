import { Routes, Route } from 'react-router-dom';
import GroupForm from './components/GroupForm';
import NotFound from './components/NotFound/NotFound';

import './App.scss';

function App() {
    return (
        <Routes>
            <Route exact path="/" element={<GroupForm />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
