const Commercial = require('../models/commercial');
const errorHandler = require('../globals').errorHandler;

const { getIo } = require('../globals');

const upsertCommercial = async (req, res) => {
    if (req.body._id) {
        const filter = { _id: req.body._id };

        Commercial.findOneAndUpdate(filter, req.body, {
            new: true,
            upsert: true,
        })
            .then(() => {
                const io = getIo();
                io.sockets.emit('updateCommerical');
                res.send(true);
            })
            .catch(errorHandler(res));
    } else {
        const comm = new Commercial(req.body);

        comm.save()
            .then(() => {
                const io = getIo();
                io.sockets.emit('updateCommerical');
                res.send(true);
            })
            .catch(errorHandler(res));
    }
};

const getCommercials = (_req, res) => {
    Commercial.find()
        .then(commercials => {
            res.json(commercials);
        })
        .catch(errorHandler(res));
};

const getCommercialsByScreenId = (req, res) => {
    const { screenId } = req.params;

    Commercial.find({ screenId })
        .then(commercials => {
            res.json(commercials);
        })
        .catch(errorHandler(res));
};

const getCommercialById = (req, res) => {
    Commercial.findById(req.params.commercialId)
        .then(commercial => {
            res.json(commercial);
        })
        .catch(errorHandler(res));
};

const deleteCommercial = (req, res) => {
    Commercial.deleteOne({ _id: req.params.commercialId })
        .then(deleteRes => {
            const io = getIo();
            io.sockets.emit('updateCommerical');
            res.json(deleteRes);
        })
        .catch(errorHandler(res));
};

const resetCommercials = async () => {
    console.log('Reseting DB...');
    // await Commercial.deleteMany();
};

module.exports = {
    getCommercials,
    getCommercialsByScreenId,
    upsertCommercial,
    getCommercialById,
    deleteCommercial,
    resetCommercials,
};
