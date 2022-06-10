const errorHandler = require('../globals').errorHandler;

const Group = require('../models/group');
const Tag = require('../models/tag');
const Dish = require('../models/dish');
const Restaurant = require('../models/restaurant');
const Client = require('../models/client');
const { calculateScores } = require('../recommenderUtils');

const recommendation = {
    dishes: [
        {
            id: '629202c76a579f0257f7aadb',
            match: 0.92,
            users: [1, 3],
        },
    ],
};

const getRecommendations = async (req, res) => {
    const group = await Group.findById(req.params.groupId)
        .populate({
            path: 'users',
            populate: [
                {
                    path: 'tags',
                },
                {
                    path: 'likedDishes',
                },
            ],
        })
        .exec();
    const restaurant = await Restaurant.findById(group.restaurantId)
        .populate({
            path: 'dishes',
            populate: {
                path: 'tags',
            },
        })
        .exec();

    const clients = group.users;
    const dishes = restaurant.dishes;

    const recommendation = calculateScores(clients, dishes);

    res.json(recommendation);
};

module.exports = {
    getRecommendations,
};
