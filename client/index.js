const express = require('express');
var path = require('path');
const cfg = require('./config.json');
const jwt = require('jsonwebtoken');
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

 app.get('/register', (req, res) => {
    if(req.cookies["x-auth-token"]) return res.redirect("../dash");
    if(req.cookies["msg"]) {
        res.render('register.hbs', { 
             "msg": req.cookies["msg"],
             "register": cfg.register
          });
        return res.clearCookie("msg");
     }
     res.render('register.hbs', { 
        "register": cfg.register
     });
 });

app.get("/logout", (req, res) => {
    res.clearCookie("x-auth-token");
    return res.redirect("../");
});

app.get("/dash", (req, res) => {
    var token = req.cookies["x-auth-token"];
    if(!token) return res.redirect("../login");
    var user = req.cookies["user"];
    if(!user) return res.redirect("../auth/data");
    try {
        const decoded = jwt.verify(user, cfg.secret);
        user = decoded;
    res.render("dash", {
        "token": token,
        "user": user.user,
        "email": user.email
    })
    } catch(e) {
        res.redirect("../login");
    }
});

app.use('/auth', require("./routes/auth"));

app.listen(cfg.port, () => console.log(`Nexhlabs-Client running on http://localhost:${cfg.port}`));