const Restaurant = require('../models/restaurant');
const errorHandler = require('../globals').errorHandler;

const { getIo } = require('../globals');

const upsertRestaurant = async (req, res) => {
    if (req.body._id) {
        const filter = { _id: req.body._id };

        Restaurant.findOneAndUpdate(filter, req.body, {
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
        const res = new Restaurant(req.body);

        res.save()
            .then(() => {
                const io = getIo();
                io.sockets.emit('updateRestaurant');
                res.send(true);
            })
            .catch(errorHandler(res));
    }
};

const getRestaurants = (_req, res) => {
    Restaurant.find()
        .then(restaurants => {
            res.json(restaurants);
        })
        .catch(errorHandler(res));
};

const getRestaurantById = (req, res) => {
    Restaurant.findById(req.params.restaurantId)
        .then(Restaurant => {
            res.json(Restaurant);
        })
        .catch(errorHandler(res));
};

const deleteRestaurant = (req, res) => {
    Restaurant.deleteOne({ _id: req.params.restaurantId })
        .then(deleteRes => {
            const io = getIo();
            io.sockets.emit('deleteRestaurant');
            res.json(deleteRes);
        })
        .catch(errorHandler(res));
};

module.exports = {
    getRestaurants,
    upsertRestaurant,
    getRestaurantById,
    deleteRestaurant,
};
