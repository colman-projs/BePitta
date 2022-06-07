import React, { useContext, useEffect, useState } from 'react';
import { getDishesByIds } from '../../../../actions/dishesActions';
import SingleResult from '../SingleResult/SingleResult';
import { GlobalContext } from '../../../../context/GlobalContext';

import './ResultsList.scss';

const dishes = [
    {
        id: '629202c76a579f0257f7aadb',
        match: 0.92,
        users: [1, 3],
    },
];

function ResultsList() {
    const [results, setResults] = useState([]);
    const { setIsLoadingApp } = useContext(GlobalContext);

    useEffect(() => {
        const fetchDishesByIds = async () => {
            setIsLoadingApp(true);
            const dishesRes = await getDishesByIds(dishes.map(dish => dish.id));

            if (!dishesRes) {
                alert.error('Error results');
                return setIsLoadingApp(false);
            }

            setResults(dishesRes);
            setIsLoadingApp(false);
        };

        fetchDishesByIds();
    }, [setIsLoadingApp]);

    return (
        <div className="results-list center">
            {results.map(result => (
                <SingleResult key={result._id} {...result} />
            ))}
        </div>
    );
}

export default ResultsList;
