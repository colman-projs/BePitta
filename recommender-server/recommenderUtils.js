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
    const userLikedDish = user.likedDishes?.some(
        d => d._id + '' === dish._id + '',
    );

    const intersection = getIntersectingTags(dish.tags, user.tags);
    const score = intersection.reduce((sum, tag) => sum + tag.weight, 0);
    const count = intersection.length;
    const maxUserScore = user.tags.reduce((sum, tag) => sum + tag.weight, 0);

    return {
        score: userLikedDish ? maxUserScore : score,
        count,
        dishMatchPercent:
            score / dish.tags.reduce((sum, tag) => sum + tag.weight, 0),
        userMatchPercent: userLikedDish ? 1 : score / maxUserScore,
        userLikedDish,
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
        score: scores.reduce((sum, match) => sum + match.score, 0),
        tagCount: scores.reduce((sum, match) => sum + match.count, 0),
        maxPossibleScore: users
            .flatMap(u => u.tags)
            .reduce((sum, t) => sum + t.weight, 0),
        userScores: scores,
        users: new Set(),
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
 * Sort the recommendations by match percentage
 */
const getSortedMatch = match => {
    return match.sort((a, b) => b.percent - a.percent);
};

/**
 * Get a final dishes normalized percentages
 */
const getDishesPercentages = match => {
    const maxPossibleScore = Math.max(...match.map(m => m.maxPossibleScore));

    return getSortedMatch(
        match.map(m => ({
            ...m,
            percent: m.score / maxPossibleScore,
        })),
    );
};

/**
 * Calculate how many dishes should we recommend to the group
 */
const getOptimalDishCount = users => {
    //return 999;
    //return Math.ceil(users.length * 1.2 + 2);
    return users.length + 3;
};

/**
 * Get the target dish count for a user
 */
const getUserMinimumDishCount = user => {
    return 2;
};

/**
 * Decide how forgiving the user assigning will be
 */
const getUserPassScoreTreshold = userScores => {
    return (
        userScores.userMatchPercent > 0.75 //|| userScores.dishMatchPercent > 0.9
    );
};

/**
 * Get the matches in order of user match, while removing bad matches
 */
const getUserTargetedMatch = (match, userId) => {
    const findUser = m => m.userScores.find(u => u.user._id + '' === userId);

    return match
        .filter(m => findUser(m).score > 0)
        .sort((a, b) => findUser(b).score - findUser(a).score);
};

/**
 * Reduce the recommendation to a certain length, making sure that each user
 * gets at least one dish
 */
const getLimitedMatchResultSet = (match, users) => {
    const userList = users.map(u => ({ user: u, dishCount: 0 }));
    const dishTarget = getOptimalDishCount(users);
    const dishPerUser = getUserMinimumDishCount();
    const finalMatch = new Set();

    // Make sure every user gets enough dishes
    userList.forEach(u => {
        const userMatch = getUserTargetedMatch(match, u.user._id + '');

        userMatch.forEach(m => {
            const userScores = m.userScores.find(
                s => s.user._id + '' === u.user._id + '',
            );

            if (getUserPassScoreTreshold(userScores)) {
                m.users.add(u.user._id + '');
            }

            if (u.dishCount < dishPerUser) {
                m.users.add(u.user._id + '');

                finalMatch.add(m);
                u.dishCount++;
            }
        });
    });

    // Reach the final target
    match.forEach(m => {
        if (finalMatch.size < dishTarget) {
            finalMatch.add(m);
        }
    });

    return getSortedMatch([...finalMatch]);
};

/**
 * Get the bias ratio for the percentages recalculation
 */
const getPercentageUserBias = () => {
    return 3;
};

/**
 * Get the ratio between the final scoring of the dish user intersection
 */
const getDishUserMatchBias = () => {
    return 0.8;
};

/**
 * Bias the percentages to lean more towards the chosen users of each
 * recommendation
 */
const recalculateMatchUserPercentages = match => {
    const chosenUserBias = getPercentageUserBias();
    const userBias = getDishUserMatchBias();
    const dishBias = 1 - userBias;

    match.forEach(m => {
        const bias = 1 / (m.users.size + chosenUserBias);
        let userPercentage = m.percent * bias * chosenUserBias;
        let dishPercentage = m.percent * bias * chosenUserBias;

        m.users.forEach(u => {
            const userScores = m.userScores.find(s => s.user._id + '' === u);
            userPercentage += userScores.userMatchPercent * bias;
            dishPercentage += userScores.dishMatchPercent * bias;
        });

        m.unbiasedPercent = m.percent;
        m.percent = userBias * userPercentage + dishBias * dishPercentage;
    });
};

/**
 * Format the recommendations to the final API form
 */
const getFinalResultFromMatch = match => {
    return match.map(m => ({
        id: m.dish._id,
        match: Math.ceil(100 * m.percent),
        users: [...m.users],
    }));
};

/**
 * Get a final recommendation of what dish to take, specifying match
 * percentage and matching users
 */
const calculateScores = (users, dishes) => {
    const perfStart = performance.now();

    const matches = getDishesPercentages(getMatchDishesToUsers(dishes, users));

    const finalMatches = getLimitedMatchResultSet(matches, users);
    recalculateMatchUserPercentages(finalMatches);

    const duration = performance.now() - perfStart;

    return {
        dishes: getFinalResultFromMatch(finalMatches),
        testData: matches,
        algDuration: duration,
    };
};

module.exports = {
    calculateScores,
};
