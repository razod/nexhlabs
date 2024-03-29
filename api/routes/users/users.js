const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const cfg = require('../../config.json');
const jwt = require('jsonwebtoken');



// @route     POST /users
// @desc      Register new nexhlab account
// @access    Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }

    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: 'Email already used!'});
        
        const newUser = new User({
            name,
            email,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                   .then(user => {

                     jwt.sign(
                        { id: user.id }, 
                         cfg.secret,
                        { expiresIn: 99999 },
                        (err, token) => {
                         if(err) throw err;

                         res.json({
                             token: token,
                             user: {
                                 id: user.id,
                                 name: user.name,
                                 email: user.email
                             }
                         })

                        }
                     )

                   });
            })
        })
    })
});

module.exports = router;