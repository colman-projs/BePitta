const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/auth.config');
const admins = require('../models/admin');

const authenticate = (req, res) => {
    admins
        .findOne({
            username: req.body.username,
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: 'Server Error 500 :(' });
                return;
            }

            if (!user) {
                return res
                    .status(401)
                    .send({ message: 'Username or password are incorrect!' });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password,
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Username or password are incorrect!',
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400, // 24 hours
            });

            res.status(200).send({
                id: user._id,
                username: user.username,
                accessToken: token,
            });
        });
};

const updateDetails = async (req, res) => {
    const admin = await admins.findOne({ _id: req.body.id });

    if (!admin) res.status(500).send({ message: "Couldn't find user" });

    let updateField = null;

    if (req.body.username) updateField = { username: req.body.username };
    else if (req.body.password)
        updateField = {
            password: req.body.password
                ? bcrypt.hashSync(req.body.password, 8)
                : '',
        };
    else {
        res.status(404).send({ message: 'No password/username entered' });
    }

    admins.findByIdAndUpdate(admin._id, updateField, (err, _result) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            res.status(200).send(true);
        }
    });
};

module.exports = {
    authenticate,
    updateDetails,
};
