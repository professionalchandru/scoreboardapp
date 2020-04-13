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
    eventname: Joi.string().alphanum().trim().min(2).required(),
    eventtype: Joi.string().trim().required(),
    players:  Joi.array().items(Joi.object().keys({
        name: Joi.string().min(2).required(),
        sprno: Joi.number().required(),
        department: Joi.string().min(2).max(50).required(),
        year: Joi.number().max(4).required(),
        timing: Joi.string().required()
    })),
    eventdate: Joi.date()
});

router.get('/showresults', async(req, res) => {
    try{
    const showresult = await datamodel.find({},{_id:0});
    res.json(showresult)
    }
    catch(err){
        if(err){
            res.json({message:err})
        }
    }
});

router.post('/insert', async(req, res) => {    
    ieventname = req.body.eventname
    ieventtype = req.body.eventtype
    iname1 = req.body.name1
    iname2 = req.body.name2
    iname3 = req.body.name3
    isprno1 = req.body.sprno1
    isprno2 = req.body.sprno2
    isprno3 = req.body.sprno3
    idepartment1 = req.body.department1
    idepartment2 = req.body.department2
    idepartment3 = req.body.department3
    iyear1 = req.body.year1
    iyear2 = req.body.year2
    iyear3 = req.body.year3
    itiming1 = req.body.timing1
    itiming2 = req.body.timing2
    itiming3 = req.body.timing3

    newobj ={
        eventname: ieventname,
        eventtype: ieventtype,
        players: [
            {
                name:iname1,
                sprno: isprno1,
                department: idepartment1,
                year: iyear1,
                timing: itiming1
            },
            {
                name:iname2,
                sprno: isprno2,
                department: idepartment2,
                year: iyear2,
                timing: itiming2
            },
            {
                name:iname3,
                sprno: isprno3,
                department: idepartment3,
                year: iyear3,
                timing: itiming3
            }
        ]
    }
    insertdata = new datamodel(newobj)
    const validate = Schema.validate(insertdata.toObject())
    if(validate.error == null){
        const inserted_data = await insertdata.save((err,result)=> {
            if(err){
                console.log(err)
                res.json(err)
            }
            else{
                console.log(result)
                res.json(result)
            }
        })   
    }
    else{
        console.log(validate.error.message)
        res.json(validate.error.message)
    }
});

module.exports = router;