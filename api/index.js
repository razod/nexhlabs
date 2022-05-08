const express = require('express');
const cfg = require('./config');


const app = express();
app.use(express.json());

app.listen(cfg.port, () => console.log(`Nexhlabs-API running on http://localhost:${cfg.port}`));