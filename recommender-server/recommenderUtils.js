const defaultRec = {
    dishes: [
        {
            id: '629202c76a579f0257f7aadb',
            match: 0.92,
            users: [1, 3],
        },
    ],
};

const getIntersectingTags = (tags1, tags2) => {
    return tags1.filter(t1 => tags2.some(t2 => t1.value === t2.value));
};

const getMatchDishToUser = (dish, user) => {
    const intersection = getIntersectingTags(dish, user);

    return {
        score: intersection.reduce((sum, tag) => sum + tag.weight, 0),
        count: intersection,
    };
};

const getMatchDishToUsers = (dish, users) => {
    const scores = users.map(u => getMatchDishToUser(dish, u));

    return {
        score: scores.reduce((sum, match) => sum + match.score),
        tagCount: scores.reduce((sum, match) => sum + match.count),
        userCount: scores.filter(match => match > 0),
    };
};

const calculateScores = (users, dishes, tags) => {
    const dishesMatch = dishes.map(d => {
        return;
    });

    //return defaultRec; // todo
};

module.exports = {
    calculateScores,
};
