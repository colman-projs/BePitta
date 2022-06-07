import React from 'react';
import { Typography } from '@mui/material';
import ResultsList from '../ResultsList/ResultsList';

import './ResultsPage.scss';

function ResultsPage() {
    return (
        <div className="results-page">
            <Typography variant="h4">We think you would like:</Typography>
            <ResultsList />
        </div>
    );
}

export default ResultsPage;
