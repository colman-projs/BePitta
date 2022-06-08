import React from 'react';
import SingleResult from '../SingleResult/SingleResult';

import './ResultsList.scss';

function ResultsList({ results }) {
    return (
        <div className="results-list">
            {results
                .sort((r1, r2) => r2.percentage - r1.percentage)
                .slice(0, 3)
                .map(result => (
                    <SingleResult key={result._id} {...result} />
                ))}
        </div>
    );
}

export default ResultsList;
