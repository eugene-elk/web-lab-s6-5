const MongoClient    = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbconfig = require('../config/db');

module.exports = function (app) {
    app.post('/create', function (req, res) {
        MongoClient.connect(dbconfig.url, dbconfig.options, function (err, connection) {
            console.log(err);
            console.log(connection);
            connection.db('lab5').collection('MDdocs').insertOne({title : req.body.name, text : req.body.text}, function(err, result) {
                res.json(result.insertedId)
            })
        });
        console.log('Created new file');
    });
};
