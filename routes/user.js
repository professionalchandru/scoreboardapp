const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
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

const loginSchema = Joi.object().keys({
    username: Joi.string().trim().required(),
    password: Joi.string().trim().max(800).required()
})

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

router.post('/login', async(req, res) => {
    // let uname = req.body.username;
    // let psswd = req.body.password;


    //validate login inputs
    const validate = loginSchema.validate(req.body);

    if (validate.error == null) {
        //Check user if already exist
        const user = await usermodel.findOne({ username: req.body.username });
        if (!user) return res.status(400).send('Invalid User')

        //check password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).send('Invalid Password')

        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.TOKEN_SECRET, { expiresIn: '5h' });
        res.header('auth-token', token).send(token)
    } else {
        console.log(validate.error.message);
        res.status(400).send(validate.error.message);
    }
})

module.exports = router;