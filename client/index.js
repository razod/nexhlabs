const express = require('express');
var path = require('path');
const cfg = require('./config.json');

var app = express();
app.use('/public', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.use('/auth', require("./routes/auth"));

app.listen(cfg.port, () => console.log(`Nexhlabs-Client running on http://localhost:${cfg.port}`));