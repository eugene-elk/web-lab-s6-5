const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());

require('./routes/create')(app);
require('./routes/getFiles')(app)
require('./routes/get')(app);
require('./routes/update')(app);
require('./routes/delete')(app);

app.listen(8000, () => {
    console.log('We are live on ' + 8000);
});