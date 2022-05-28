import { useNavigate, useParams } from 'react-router-dom';
import React, { useContext } from 'react';
import { GlobalContext } from '../../../../context/GlobalContext';

import './ResultsWaitingPage.scss';

function ResultsWaitingPage() {
    const { setIsLoadingApp } = useContext(GlobalContext);
    const navigate = useNavigate();

    return <div className="results-waiting-page center"></div>;
}

export default ResultsWaitingPage;
