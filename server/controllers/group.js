const Group = require('../models/group');
const errorHandler = require('../globals').errorHandler;

const { getIo } = require('../globals');

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

        group.save()
            .then(() => {
                const io = getIo();
                io.sockets.emit('updateRestaurants');
                res.json(group);
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

const getGroupById = (req, res) => {
    Group.findById(req.params.groupId)
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

const addUserToGroup = (groupId, userId) => {
    Group.findOneAndUpdate({ _id: groupId }, {
        $addToSet: { users: userId }
    }).then((a) => { })
        .catch(err => { });
};

const removeUserFromGroup = (groupId, userId) => {
    Group.findOneAndUpdate({ _id: groupId }, {
        $pull: { users: userId }
    }).then((a) => { })
        .catch(err => { });
};


module.exports = {
    getGroups,
    upsertGroup,
    getgroupById: getGroupById,
    deleteGroup,
    resetGroups,
    addUserToGroup,
    removeUserFromGroup,
};
