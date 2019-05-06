const MongoClient    = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbconfig = require('../config/db');

module.exports = function (app) {
    app.get('/files', function (req, res) {
        MongoClient.connect(dbconfig.url, dbconfig.options, function (err, connection) {
            connection.db('lab5').collection('MDdocs').find({}, { projection: { title: 1 } }).toArray(function (err, result) {
                res.json(result)
            })
        });
        console.log('Get all files');
    });
};