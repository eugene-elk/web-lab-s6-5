const MongoClient    = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const dbconfig = require('../config/db');

module.exports = function (app) {
    app.put('/', function (req, res) {
        MongoClient.connect(dbconfig.url, dbconfig.options, function (err, connection) {
            connection.db('lab5').collection('MDdocs').updateOne({_id : new ObjectId(req.body.id)}, {$set: {title : req.body.name, text : req.body.text}}, function (err, result) {
                res.sendStatus(200)
            });
        });
        console.log('Updated file')
    });
};