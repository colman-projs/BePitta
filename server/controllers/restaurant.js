const Restaurant = require('../models/restaurant');
const errorHandler = require('../globals').errorHandler;
const dishController = require('./dish.js');

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
        const model = new Restaurant(req.body);

        model
            .save()
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

const getRestaurantDishes = (req, res) => {
    Restaurant.findById(req.params.restaurantId)
        .then(Restaurant => {
            dishController
                .getDishesByIdsPerResturant(Restaurant.dishes)
                .then(dishes => {
                    if (dishes) {
                        res.json(dishes);
                    }
                });
        })
        .catch(errorHandler(res));
};

module.exports = {
    getRestaurants,
    upsertRestaurant,
    getRestaurantById,
    deleteRestaurant,
    getRestaurantDishes,
};
