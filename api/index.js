const express = require('express');
const mongoose = require('mongoose');
const cfg = require('./config.json');

// Routes
const auth = require('./routes/api/auth');
const users = require('./routes/api/users');

const app = express();
app.use(express.json());

mongoose
    .connect(cfg.mongoDB)
    .then(() => console.log('Nexhlabs-API Connected to database!'))
    .catch(err => console.log(err));

app.use('/api/auth', auth); 
app.use('/api/users', users);


app.listen(cfg.port, () => console.log(`Nexhlabs-API running on http://localhost:${cfg.port}`));