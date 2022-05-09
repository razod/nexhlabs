const express = require('express');
var path = require('path');
const cfg = require('./config.json');
const cookieParser = require("cookie-parser");

var app = express();
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index.hbs');
});
app.get('/login', (req, res) => {
    if(req.cookies["x-auth-token"]) return res.redirect("../dash");
    if(req.cookies["msg"]) {
        res.render('login.hbs', { 
             "msg": req.cookies["msg"],
             "login": cfg.login
          });
        return res.clearCookie("msg");
     }
     res.render('login.hbs', { 
        "login": cfg.login
     });
 });

app.get("/logout", (req, res) => {
    res.clearCookie("x-auth-token");
    return res.redirect("../");
});

app.get("/dash", (req, res) => {
    var token = req.cookies["x-auth-token"];
    if(!token) return res.redirect("../login");
    res.render("dash", {
        "token": token
    })
});

app.use('/auth', require("./routes/auth"));

app.listen(cfg.port, () => console.log(`Nexhlabs-Client running on http://localhost:${cfg.port}`));