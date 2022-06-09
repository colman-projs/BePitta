const errorHandler = require('../globals').errorHandler;
const { getIo } = require('../globals');
const Tag = require('../models/tag');

const upsertTag = async (req, res) => {
    if (req.body._id) {
        const filter = { _id: req.body._id };

        Tag.findOneAndUpdate(filter, req.body, {
            new: true,
            upsert: true,
        })
            .then(() => {
                const io = getIo();
                io.sockets.emit('updateTags');
                res.send(true);
            })
            .catch(errorHandler(res));
    } else {
        const tag = new Tag(req.body);

        tag.save()
            .then(() => {
                const io = getIo();
                io.sockets.emit('updateTags');
                res.send(true);
            })
            .catch(errorHandler(res));
    }
};

const getTags = (_req, res) => {
    Tag.find()
        .then(Tags => {
            res.json(Tags);
        })
        .catch(errorHandler(res));
};

const getTagById = (req, res) => {
    Tag.findById(req.params.tagId)
        .then(Tag => {
            res.json(Tag);
        })
        .catch(errorHandler(res));
};

const deleteTag = (req, res) => {
    Tag.deleteOne({ _id: req.params.tagId })
        .then(deletedTag => {
            const io = getIo();
            io.sockets.emit('updateTags');
            res.json(deletedTag);
        })
        .catch(errorHandler(res));
};

module.exports = {
    getTags,
    upsertTag,
    getTagById,
    deleteTag,
};
