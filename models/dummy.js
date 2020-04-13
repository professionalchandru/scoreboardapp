const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

//import datamodel for schema
const datamodel = require('../models/datamodel');

// const playerschema = Joi.array().items(Joi.object().keys({
//     name: Joi.string().min(2).required(),
//     sprno: Joi.number().min(4).max(4).required(),
//     department: Joi.string().min(2).max(50).required(),
//     year: Joi.number().required(),
//     timing: Joi.number().required()
// }));

const Schema = Joi.object().keys({
    _id: Joi.objectId,
    eventname: Joi.string().trim().min(2).required(),
    eventtype: Joi.string().trim().required(),
    players:  Joi.array().items(Joi.object().keys({
        name: Joi.string().min(2).required(),
        sprno: Joi.number().min(4).max(4).required(),
        department: Joi.string().min(2).max(50).required(),
        year: Joi.number().required(),
        timing: Joi.number().required()
    })),
    eventdate: Joi.date()
});

router.get('/', (req, res) => {
    res.send('working')
});

router.post('/insert', async(req, res) => {    
    play = req.body.players

    for (key in play) {
        // newobj = {
        //     // name: players[key].name,
        //     arr : [play[key]]
        // }
        // const p = new datamodel({
        //     players: newobj
        // });
        // console.log(p)
       let indata = new datamodel({
            eventname: req.body.eventname,
            eventtype: req.body.eventtype,
            players : play[key]        
        })            
    }        
    // const insertdata = new datamodel({
    //     eventname: req.body.eventname,
    //     eventtype: req.body.eventtype,
    //     // players : newobj
    // });
    // console.log(insertdata)
    const validate = Schema.validate(indata.toObject());

    // // console.log(validate)
    // if (validate.error == null) {
    //     console.log(validate)
    // }
});

module.exports = router;