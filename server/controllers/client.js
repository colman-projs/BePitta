const Clients = require('../models/client');
const { errorHandler } = require('../globals');
const { groupDAL } = require('./group');

const createClient = async (req, res) => {
    const client = new Clients(req.body);

    client
        .save()
        .then(result => {
            res.json(result._id);
        })
        .catch(errorHandler(res));
};

const getClients = (_req, res) => {
    Clients.find()
        .then(clients => {
            res.status(200).json(clients);
        })
        .catch(errorHandler(res));
};

const getClientByGoogleId = (_req, res) => {
    Clients.findOne({
        googleId: _req.params.googleId,
    })
        .then(client => {
            res.send(client);
        })
        .catch(errorHandler(res));
};

const getClientById = (req, res) => {
    Clients.findOne({
        _id: req.params.clientId,
    })
        .then(client => {
            res.send(client);
        })
        .catch(errorHandler(res));
};

const updateClient = (req, res) => {
    const filter = { _id: req.body._id };
    Clients.findOneAndUpdate(filter, req.body, {
        new: true,
        upsert: true,
    })
        .then(() => {
            res.send(true);
        })
        .catch(errorHandler(res));
};

const updateClientTags = (req, res) => {
    const filter = { _id: req.params.clientId };

    Clients.findOneAndUpdate(filter, { tags: req.body.tags })
        .then(() => {
            res.send(true);
        })
        .catch(errorHandler(res));
};

const updateClientlikedDishes = (req, res) => {
    const filter = { _id: req.params.clientId };

    Clients.findOneAndUpdate(filter, { likedDishes: req.body.dishes, isReady: req.body.prefDone })
        .then(() => {
            res.send(true);
        })
        .catch(errorHandler(res));
};

const updateUsersNotReadyByGroup = async (groupId) => {
    try {
        const group = await groupDAL.getGroupById(groupId);

        Clients.updateMany({
            "_id": { $in: group.users.map(u => u._id) }
        }, { isReady: false }).exec();
    } catch (ex) { }
}

module.exports = {
    getClientByGoogleId,
    createClient,
    getClients,
    updateClient,
    updateClientTags,
    getClientById,
    updateClientlikedDishes,
    updateUsersNotReadyByGroup,
};
