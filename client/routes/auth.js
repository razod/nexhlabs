const express = require('express');
const router = express.Router();
const cfg = require('../config.json');
const fetch = require("node-fetch");

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
    // console.log("EMAIL: " + email);
    // console.log("PASS: " + password);
    // res.send("Test")
});

module.exports = router;