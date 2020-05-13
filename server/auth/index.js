/* ---------------------------------------- Dependencies ---------------------------------------- */

const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/connection');
require('dotenv').config();

const router = express.Router();
const users = db.get('users');
users.createIndex('username', { unique: true });

/* ----------------------------------------- Validation ----------------------------------------- */

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    password: Joi.string()
        .trim()
        .min(4)
        .required(),
    repeat_password: Joi.ref('password'),
});

router.get('/', (req, res) => {
    res.json({
        message: '🗝🔓',
    });
});

/* ------------------------------------ Route for singing up ------------------------------------ */

router.post('/signup', (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error === undefined) {
        users
            .findOne({
                username: value.username,
            })
            .then(user => {
                if (user) {
                    const duplicate = new Error(
                        'That username is already taken. Please choose another one.'
                    );
                    res.status(409);
                    next(duplicate);
                } else {
                    bcrypt.hash(value.password.trim(), 10, function(err, hash) {
                        const newUser = {
                            username: value.username,
                            password: hash,
                        };
                        users.insert(newUser).then(insertedUser => {
                            delete insertedUser.password;
                            res.json(insertedUser);
                        });
                    });
                }
            });
    } else {
        res.status(422);
        next(error);
    }
});

/* ------------------------------------ Route for logging in ------------------------------------ */

router.post('/login', (req, res, next) => {
    const loginError = new Error('Unable to login');
    const { error, value } = schema.validate(req.body);
    if (error === undefined) {
        users
            .findOne({
                username: value.username,
            })
            .then(user => {
                if (user) {
                    bcrypt.compare(value.password, user.password).then(result => {
                        if (result) {
                            const payload = {
                                _id: user._id,
                                username: user.username,
                            };
                            jwt.sign(
                                payload,
                                process.env.TOKEN_SECRET,
                                { expiresIn: '1h' },
                                (err, token) => {
                                    if (err) {
                                        res.status(401);
                                        next(loginError);
                                    } else {
                                        res.json({
                                            token,
                                        });
                                    }
                                }
                            );
                        } else {
                            res.status(401);
                            next(loginError);
                        }
                    });
                } else {
                    res.status(401);
                    next(loginError);
                }
            });
        // test
    } else {
        res.status(401);
        next(loginError);
    }
});

module.exports = router;
