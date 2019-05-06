const MongoClient    = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const dbconfig = require('../config/db');

module.exports = function (app) {
    app.post('/delete', function (req, res) {
        MongoClient.connect(dbconfig.url, dbconfig.options, function (err, connection) {
            connection.db('lab5').collection('MDdocs').deleteOne({_id : new ObjectId(req.body.id)}, function(err, result) {
                console.log(err);
                console.log(req.body.id)
                console.log(result.deletedCount);
                res.sendStatus(200)
            })
        });
        console.log('Deleted file');
    });
};