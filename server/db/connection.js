const monk = require('monk');

const url = 'localhost/torch';
const db = monk(url);

db.then(() => {
    console.log('Connected correctly to server');
});

module.exports = db;
