const defaultRec = {
    dishes: [
        {
            id: '629202c76a579f0257f7aadb',
            match: 0.92,
            users: [1, 3],
        },
    ],
};

/**
 * Get the number of common tags between two lists
 */
const getIntersectingTags = (tags1, tags2) => {
    return tags1.filter(t1 => tags2.some(t2 => t1.value === t2.value));
};

/**
 * Get the match score of a dish to a user
 */
const getMatchDishToUser = (dish, user) => {
    const intersection = getIntersectingTags(dish, user);

    return {
        score: intersection.reduce((sum, tag) => sum + tag.weight, 0),
        count: intersection,
    };
};
/**
 * Get the match score of a dish to a list of users
 */
const getMatchDishToUsers = (dish, users) => {
    const scores = users.map(u => ({
        user: u,
        ...getMatchDishToUser(dish, u),
    }));

    return {
        score: scores.reduce((sum, match) => sum + match.score),
        tagCount: scores.reduce((sum, match) => sum + match.count),
        maxPossibleScore: dish.tags.reduce((sum, t) => sum + t.weight),
        users: scores,
    };
};

/**
 * Get the calculated match score for every dish
 */
const getMatchDishesToUsers = (dishes, users) => {
    return dishes.map(d => ({
        dish: d,
        ...getMatchDishToUsers(d, users),
    }));
};

/**
 * Get a final dishes normalized percentages
 */
const getDishesPercentages = match => {
    const maxPossibleScore = Math.max(...match.map(m => m.maxPossibleScore));

    return match.map(m => ({
        ...m,
        percent: m.score / maxPossibleScore,
    }));
};

/**
 * Get a final recommendation of what dish to take, specifying match
 * percentage and matching users
 */
const calculateScores = (users, dishes /*, tags*/) => {
    const matches = getMatchDishesToUsers(dishes, users);
    const percentages = getDishesPercentages(matches);

    //return defaultRec; // todo
};

module.exports = {
    calculateScores,
};
