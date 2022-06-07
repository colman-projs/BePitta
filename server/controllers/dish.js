const Group = require('../models/group');
const errorHandler = require('../globals').errorHandler;
const { getIo } = require('../globals');
const dish = require('../models/dish');

const upsertDish = async (req, res) => {
    if (req.body._id) {
        const filter = { _id: req.body._id };

        Group.findOneAndUpdate(filter, req.body, {
            new: true,
            upsert: true,
        })
            .then(() => {
                const io = getIo();
                io.sockets.emit('updateDishes');
                res.send(true);
            })
            .catch(errorHandler(res));
    } else {
        const Dish = new dish(req.body);

        Dish.save()
            .then(() => {
                const io = getIo();
                io.sockets.emit('updateDishes');
                res.send(true);
            })
            .catch(errorHandler(res));
    }
};

const getDishes = (_req, res) => {
    dish.find()
        .then(dishes => {
            res.json(dishes);
        })
        .catch(errorHandler(res));
};

const getdishById = (req, res) => {
    dish.findById(req.params.dishId)
        .then(Dish => {
            res.json(Dish);
        })
        .catch(errorHandler(res));
};

const getDishesByIds = async (req, res) => {
    try {
        const allDishes = await dish.find({ _id: [...req.body.ids] }).exec();
        res.json(allDishes);
    } catch (e) {
        errorHandler(e);
    }
};

const deleteDish = (req, res) => {
    dish.deleteOne({ _id: req.params.dishId })
        .then(deletedDish => {
            const io = getIo();
            io.sockets.emit('updateDishes');
            res.json(deletedDish);
        })
        .catch(errorHandler(res));
};

module.exports = {
    getDishes,
    upsertDish,
    getdishById,
    deleteDish,
    getDishesByIds,
};
