const errorHandler = require('../globals').errorHandler;

const Group = require('../models/group');
const Tag = require('../models/tag');
const Dish = require('../models/dish');
const Restaurant = require('../models/restaurant');
const Client = require('../models/client');
const { calculateScores } = require('../recommenderUtils');
/*
const upsertGroup = async (req, res) => {
    if (req.body._id) {
        const filter = { _id: req.body._id };

        Group.findOneAndUpdate(filter, req.body, {
            new: true,
            upsert: true,
        })
            .then(() => {
                const io = getIo();
                io.sockets.emit('updateRestaurant');
                res.send(true);
            })
            .catch(errorHandler(res));
    } else {
        const group = new Group(req.body);

        group
            .save()
            .then(() => {
                const io = getIo();
                io.sockets.emit('updateRestaurants');
                res.send(true);
            })
            .catch(errorHandler(res));
    }
};

const getGroups = (_req, res) => {
    Group.find()
        .then(groups => {
            res.json(groups);
        })
        .catch(errorHandler(res));
};

const getgroupById = (req, res) => {
    Group.findById(req.params.groupID)
        .then(Group => {
            res.json(Group);
        })
        .catch(errorHandler(res));
};

const deleteGroup = (req, res) => {
    Group.deleteOne({ _id: req.params.groupId })
        .then(deletedgroup => {
            const io = getIo();
            io.sockets.emit('updateGroups');
            res.json(deletedgroup);
        })
        .catch(errorHandler(res));
};

const resetGroups = async () => {
    console.log('Reseting DB...');
    // await Commercial.deleteMany();
};
*/

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
    const restaurant = await Restaurant.find(group.restaurantId)
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

    /*const usersTags = clients.flatMap(c => c.tags);
    const dishesTags = dishes.flatMap(d => d.tags);

    const allTagIds = new Set([...usersTags, ...dishesTags]);
    const allTags = await Tag.find({ _id: [...allTagIds] }).exec();*/

    const scores = calculateScores(clients, dishes /*, allTags*/);

    res.json(scores);

    //res.json(recommendation);
};

module.exports = {
    getRecommendations,
};
