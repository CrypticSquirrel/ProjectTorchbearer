/* ---------------------------------------- Dependencies ---------------------------------------- */

const express = require('express');
const db = require('../db/connection');

const router = express.Router();
const cards = db.get('cards');

/* ----------------------------------------- Validators ----------------------------------------- */

function validCard(card) {
    const hasTitle = typeof card.title === 'string' && card.title.trim() !== '';
    const hasDescription = typeof card.description === 'string' && card.description.trim() !== '';
    const hasOrder = !isNaN(card.order);
    const hasListID = !isNaN(card.listID);
    return hasTitle && hasDescription && hasOrder && hasListID;
}

/* ----------------------------------------- CRUD Routes ---------------------------------------- */

/* Get all cards */
router.get('/', (req, res) => {
    cards.find({}).then((docs) => {
        res.send(docs);
    });
});

/* Gets one card */
router.get('/:id', (req, res, next) => {
    cards
        .findOne({
            _id: req.params.id,
        })
        .then((card) => {
            if (card) {
                res.json(card);
            } else {
                next();
            }
        });
});

/* Add a card */
router.post('/', (req, res, next) => {
    if (validCard(req.body)) {
        cards.insert(req.body).then((docs) => {
            res.json(docs);
        });
    } else {
        next(new Error('Invalid card'));
    }
});

/* Update a card */
router.put('/:id', (req, res, next) => {
    if (validCard(req.body)) {
        cards.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then((updatedCard) => {
            res.json(updatedCard);
        });
    } else {
        next(new Error('Invalid card'));
    }
});

/* Delete a card */
router.delete('/:id', (req, res) => {
    cards.findOneAndDelete({ _id: req.params.id }).then(() => {
        res.json({
            deleted: true,
        });
    });
});

module.exports = router;
