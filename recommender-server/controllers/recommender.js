require('../models/client');
require('../models/dish');
require('../models/tag');
const errorHandler = require('../globals').errorHandler;
const Group = require('../models/group');
const Restaurant = require('../models/restaurant');

const { calculateScores } = require('../recommenderUtils');

const getRecommendations = async (req, res) => {
    try {
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

        if (!group) {
            return res.status(400).send('Group not found');
        }

        const restaurant = await Restaurant.findById(group.restaurantId)
            .populate({
                path: 'dishes',
                populate: {
                    path: 'tags',
                },
            })
            .exec();

        if (!restaurant) {
            return res.status(400).send('Restaurant not found');
        }

        const clients = group.users;
        const dishes = restaurant.dishes;

        const recommendation = calculateScores(clients, dishes);
        res.json(recommendation);
    } catch (e) {
        errorHandler(res)(e);
    }
};

module.exports = {
    getRecommendations,
};
