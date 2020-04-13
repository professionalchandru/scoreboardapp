const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const bcrypt = require('bcrypt');

const rounds = 8 // No of rounds it should encrypt

//import usermodel for mongoose schema
const usermodel = require('../models/usermodel');

const Schema = Joi.object().keys({
    _id: Joi.objectId,
    name: Joi.string().trim().required(),
    type: Joi.string().required(),
    username: Joi.string().trim().required(),
    password: Joi.string().trim().min(8).max(800).required(),
    // confirmpassword: Joi.ref('password'),
    registereddate: Joi.date()
});


router.get('/', async(req, res) => {
    try {
        const getreguser = await usermodel.find();
        res.json(getreguser);
    } catch (err) {
        if (err) res.json(err);
    }
});

router.post('/register', async(req, res) => {
    bcrypt.hash(req.body.password, rounds, async(err, hash) => {
        const register_user = new usermodel({
            name: req.body.name,
            type: req.body.type,
            username: req.body.username,
            password: hash
        });

        const validate = Schema.validate(register_user.toObject())

        if (validate.error == null) {
            try {
                const registered_user = await register_user.save()
                res.json(registered_user)
            } catch (err) {
                if (err) res.json(err);
            }
        } else {
            res.json(validate.error);
            console.log(validate.error)
        }
    });
});

router.post('/login', (req, res) => {
    let uname = req.body.username;
    let psswd = req.body.password;
    usermodel.findOne({ 'username': uname }, (err, result) => {
        if (result) {
            // console.log(result)            
            bcrypt.compare(psswd, result.password, (perr, pres) => {
                if (pres) {
                    console.log("password " + pres);
                    res.json({ password: pres });
                    // res.send('You are loggedin successfully')
                } else {
                    console.log('Password wrong');
                }
            });
        } else {
            console.log('Email is wrong');
            res.json({ message: 'Enter correct email' })
        }
    })
})

module.exports = router;