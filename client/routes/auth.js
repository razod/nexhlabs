const express = require('express');
const router = express.Router();
const cfg = require('../config.json');
const fetch = require("node-fetch");
const { response } = require('express');

// @route     GET /auth/login
// @desc      Authenticate User
// @access    Public
router.get('/login', async (req, res) => {
    const { email, password } = req.query;
     if(!email || !password) {
         res.redirect("../register");
     }
     var body = {
         "email": email,
         "password": password
     }
     var login = await fetch.default(cfg.api + "auth", { 
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
     });
     var data = await login.json();
     if(data.msg) {
        res.cookie("msg", data.msg);
         return res.redirect("../login");
     } else {
        res.cookie("x-auth-token", data.token);
        return res.redirect("../dash");
     }
});

// @route     GET /auth/login
// @desc      Authenticate User
// @access    Public
router.get('/register', async (req, res) => {
    const { username, email, password } = req.query;
     if(!username || !email || !password) {
         res.redirect("../register");
     }
     var body = {
         "name": username,
         "email": email,
         "password": password
     }
     var login = await fetch.default(cfg.api + "users", { 
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
     });
     var data = await login.json();
     if(data.msg) {
        res.cookie("msg", data.msg);
         return res.redirect("../register");
     } else {
        res.cookie("x-auth-token", data.token);
        return res.redirect("../dash");
     }
});

router.get('/data', async (req, res) => {
    var token = req.cookies["x-auth-token"];
    if(!token) return res.redirect("../login");

    var login = await fetch.default(cfg.api + "auth/user", { 
        method: 'get',
        headers: {'x-auth-token': `${token}`, 'Content-Type': 'application/json'}
     });
     var data = await login.json();

     console.log({ data })
     res.send(data);
});

module.exports = router;