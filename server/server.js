/* ---------------------------------------- Dependencies ---------------------------------------- */

const express = require('express');
const auth = require('./auth');

const app = express();
const port = 3000;

app.use(express.json());

/* ---------------------------------------- Basic Routes ---------------------------------------- */

app.get('/', (req, res) => res.send('☃︎'));

app.use('/auth', auth);

/* --------------------------------------- Error Handling --------------------------------------- */

function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error);
}

function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack,
    });
}

app.use(notFound);
app.use(errorHandler);

/* -------------------------------------- Listen on a port -------------------------------------- */

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
