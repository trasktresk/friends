const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();

app.use('/dist', express.static('dist'));

app.get('/api/users', function (req, res) {
    fs.readFile('server/data/friends.json', (err, data) => {
        if (err) throw err;
        res.type('json').send(data);
    });
});

app.get('*', function (req, res) {
    res.sendFile(path.resolve('./server/views/index.html'));
});

app.listen(8080, function () {
    console.log('Server listening on port 8080!');
});