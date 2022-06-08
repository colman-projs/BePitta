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
    //return res.json({ BEST: 'GOOD' });
    // Get required data
    const group = await Group.findById(req.params.groupId)
        //.populate('users')
        .populate({
            path: 'users',
            populate: {
                path: 'tags',
                //model: 'Component',
            },
        })
        .exec();
    const restaurant = await Restaurant.findById(group.restaurantId)
        //.populate('dishes')
        .populate({
            path: 'dishes',
            populate: {
                path: 'tags',
                //model: 'Component',
            },
        })
        .exec();

    const clients = group.users;
    const dishes = restaurant.dishes;
    /*return res.json({
        group,
        restaurant,
    });*/
    /*const usersTags = clients.flatMap(c => c.tags);
    const dishesTags = dishes.flatMap(d => d.tags);

    const allTagIds = new Set([...usersTags, ...dishesTags]);
    const allTags = await Tag.find({ _id: [...allTagIds] }).exec();*/

    const recommendation = calculateScores(clients, dishes /*, allTags*/);

    res.json(recommendation);
};

module.exports = {
    getRecommendations,
};
