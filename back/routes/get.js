const MongoClient    = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbconfig = require('../config/db');

module.exports = function (app) {
    app.get('/file', function (req, res) {
        MongoClient.connect(dbconfig.url, dbconfig.options, function (err, connection) {
            connection.db('lab5').collection('MDdocs').findOne({_id : new ObjectId(req.query.id)}, function (err, result) {
                res.json(result)
            });
        });
        console.log('get file')
    });
};