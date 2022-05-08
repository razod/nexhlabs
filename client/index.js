const express = require('express');
var path = require('path');

var app = express();
app.use('/public', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index.hbs');
})

app.listen(1111, () => console.log("Nexhlabs-Client running on http://localhost:1111"));