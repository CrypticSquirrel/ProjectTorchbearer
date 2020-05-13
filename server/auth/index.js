/* ---------------------------------------- Dependencies ---------------------------------------- */

const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const db = require('../db/connection');

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

/* ------------------------------------------- Routes ------------------------------------------- */

router.get('/', (req, res) => {
    res.json({
        message: '🗝🔓',
    });
});

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
                    next(duplicate);
                } else {
                    bcrypt.hash(value.password, 10, function(err, hash) {
                        const newUser = {
                            username: value.username,
                            password: hash,
                        };
                        users.insert(newUser).then(insertedUser => {
                            res.json(insertedUser);
                        });
                    });
                }
            });
    } else {
        next(error);
    }
});

module.exports = router;
