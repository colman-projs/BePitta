import React from 'react';
import SingleResultFull from '../SingleResultFull/SingleResultFull';

import './FullResultsList.scss';

function FullResultsList({ results }) {
    return (
        <div className="full-results-list">
            {results
                .sort((r1, r2) => r2.percentage - r1.percentage)
                .map(result => (
                    <SingleResultFull key={result._id} {...result} />
                ))}
        </div>
    );
}

export default FullResultsList;
