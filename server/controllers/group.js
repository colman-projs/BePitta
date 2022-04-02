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
        const comm = new Restaurant(req.body);

        comm.save()
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

const getresturantById = (req, res) => {
    Resturant.findById(req.params.resturantID)
        .then(Resturant => {
            res.json(Resturant);
        })
        .catch(errorHandler(res));
};

const deleteResturant = (req, res) => {
    Restaurant.deleteOne({ _id: req.params.resturantlId })
        .then(deleteRes => {
            const io = getIo();
            io.sockets.emit('updateCommerical');
            res.json(deleteRes);
        })
        .catch(errorHandler(res));
};

const resetResturants = async () => {
    console.log('Reseting DB...');
    // await Commercial.deleteMany();
};


module.exports = {
    getRestaurants,
    upsertRestaurant,
    getresturantById,
    deleteResturant,
    resetResturants,
};
